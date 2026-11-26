import { readdir, readFile } from "node:fs/promises";

import path from "node:path";

const CONTENT_DIR = path.resolve(process.argv[2] ?? "./questions");

const API_URL = "https://mentora.luisfadini.com/api/questions";
const COOKIE = process.env.COOKIE;

if (!COOKIE) {
  throw new Error("Defina a variável COOKIE.");
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      Cookie: COOKIE,
      ...options.headers,
    },
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

async function post(url, body) {
  return request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

async function patch(url, body) {
  return request(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function parseValue(value) {
  value = value.trim();

  if (!value) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "null" || value === "~") return null;

  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  if (value.startsWith('"') && value.endsWith('"')) {
    return value.slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }

  return value;
}

function parseYaml(source) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const root = {};
  const stack = [{ indent: -1, value: root }];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }

    const indent = line.match(/^ */)[0].length;
    const text = line.trim();

    while (stack.at(-1).indent >= indent) {
      stack.pop();
    }

    const parent = stack.at(-1).value;

    if (text.startsWith("- ")) {
      if (!Array.isArray(parent)) {
        throw new Error(`Array YAML inválido: ${line}`);
      }

      const item = text.slice(2);
      const match = item.match(/^([^:]+):(?:\s*(.*))?$/);

      if (match) {
        const object = {};
        parent.push(object);

        const value = parseValue(match[2] ?? "");

        if (value !== undefined) {
          object[match[1].trim()] = value;
        }

        stack.push({ indent, value: object });
      } else {
        parent.push(parseValue(item));
      }

      continue;
    }

    const match = text.match(/^([^:]+):(?:\s*(.*))?$/);

    if (!match || Array.isArray(parent)) {
      throw new Error(`Sintaxe YAML inválida: ${line}`);
    }

    const [, key, rawValue = ""] = match;
    const value = parseValue(rawValue);

    if (value !== undefined) {
      parent[key.trim()] = value;
      continue;
    }

    const nextLine = lines.slice(i + 1).find((candidate) => candidate.trim());

    const child = nextLine?.trimStart().startsWith("- ") ? [] : {};

    parent[key.trim()] = child;
    stack.push({ indent, value: child });
  }

  return root;
}

function parseMarkdown(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Front-matter não encontrado.");
  }

  return {
    ...parseYaml(match[1]),
    content: match[2].trim(),
  };
}

const MIME_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

function findImages(content) {
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;

  return [...content.matchAll(regex)].map((match) => ({
    original: match[0],
    alt: match[1],
    path: match[2].trim(),
  }));
}

function resolveImagePath(questionDirectory, imagePath) {
  const absolutePath = path.resolve(questionDirectory, imagePath);

  const relative = path.relative(questionDirectory, absolutePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Imagem fora da pasta da questão: ${imagePath}`);
  }

  return absolutePath;
}

async function uploadImage(questionId, imagePath) {
  const extension = path.extname(imagePath).toLowerCase();
  const mime = MIME_TYPES[extension];

  if (!mime) {
    throw new Error(`Formato de imagem não suportado: ${extension}`);
  }

  const buffer = await readFile(imagePath);

  const base64 = buffer.toString("base64");

  const image = await post(`${API_URL}/${questionId}/images`, {
    image: `data:${mime};base64,${base64}`,
  });

  if (!image?.id || !image?.markdown) {
    throw new Error("Resposta de upload de imagem inválida.");
  }

  return image;
}

async function replaceImages(content, questionDirectory, questionId, cache) {
  const images = findImages(content);

  for (const image of images) {
    if (/^(https?:|data:)/i.test(image.path)) {
      continue;
    }

    const absolutePath = resolveImagePath(
      questionDirectory,
      image.path
    );

    let uploaded = cache.get(absolutePath);

    if (!uploaded) {
      uploaded = await uploadImage(questionId, absolutePath);

      cache.set(absolutePath, uploaded);

      console.log(`  ↑ Imagem: ${image.path}`);
    }

    const url = `${API_URL}/${questionId}/${uploaded.id}`;
    const markdown = `![image](${url})`;

    content = content.replaceAll(image.original, markdown);
  }

  return content;
}

async function syncQuestion(filePath) {
  const questionDirectory = path.dirname(filePath);

  console.log(`\nQuestão: ${path.relative(CONTENT_DIR, filePath)}`);

  const rawContent = await readFile(filePath, "utf-8");
  const parsed = parseMarkdown(rawContent);

  const { tips = [], ...question } = parsed;

  if (!Array.isArray(tips)) {
    throw new Error("O campo tips deve ser um array.");
  }

  const created = await post(API_URL, question);

  const questionId = created?.id ?? created?.question?.id;

  if (!questionId) {
    throw new Error("API não retornou o ID da questão.");
  }

  console.log(`  ✓ Criada: ${questionId}`);

  const createdAnswers = created.answers ?? created.question?.answers ?? [];

  if (createdAnswers.length !== question.answers.length) {
    throw new Error(
      "Quantidade de alternativas retornadas diferente da enviada.",
    );
  }

  const imageCache = new Map();

  question.content = await replaceImages(
    question.content,
    questionDirectory,
    questionId,
    imageCache,
  );

  for (let i = 0; i < question.answers.length; i++) {
    question.answers[i].content = await replaceImages(
      question.answers[i].content,
      questionDirectory,
      questionId,
      imageCache,
    );

    question.answers[i].id = createdAnswers[i].id;
  }

  if (imageCache.size > 0) {
    await patch(`${API_URL}/${questionId}`, question);

    console.log("  ✓ Questão atualizada com as imagens.");
  }

  for (let i = 0; i < tips.length; i++) {
    const tip = tips[i];

    if (typeof tip !== "string" || !tip.trim()) {
      throw new Error(`Dica inválida na posição ${i + 1}.`);
    }

    await post(`${API_URL}/${questionId}/tips`, {
      order: i + 1,
      content: tip.trim(),
    });

    console.log(`  ✓ Dica ${i + 1} enviada.`);
  }

  console.log(`  ✓ Concluída: ${questionId}`);
}

async function findMarkdownFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true,
  });

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await findMarkdownFiles(CONTENT_DIR);

  console.log(`${files.length} questões encontradas.`);

  let successful = 0;
  let failed = 0;

  for (const file of files) {
    try {
      await syncQuestion(file);
      successful++;
    } catch (error) {
      console.error(`  ✗ ${error.message}`);
      failed++;
    }
  }

  console.log("\nSincronização concluída.");
  console.log(`Sucesso: ${successful}`);
  console.log(`Falhas: ${failed}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
