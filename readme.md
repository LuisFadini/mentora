# Projeto integrador

Este é o projeto integrador do curso técnico em informática.

A proposta do projeto é desenvolver uma plataforma de estudos voltada para o ENEM e outros vestibulares, reunindo diferentes recursos em um único ambiente.

A aplicação inclui:

- Questões de provas (ENEM e outros vestibulares)
- Conteúdos teóricos para estudo
- Um fórum para discussão e resolução de dúvidas

## Desenvolvimento

O projeto está sendo desenvolvido com as seguintes tecnologias:

### Backend

- TypeScript
- Express
- OpenAPI

### Frontend

- Svelte
- TailwindCSS

## Rodando o projeto

### Pré-requisitos

- Node.js (versão 24 ou superior)
- pnpm instalado
  Caso não tenha o pnpm instalado, veja <https://pnpm.io/installation>, em resumo:

```bash
npm install -g pnpm
```

### Instalação

Clone o repositório:

```bash
git clone https://github.com/luisfadini/questionar
cd questionar
```

Instale as dependências

```bash
pnpm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto, siga o [`.env.example`](.env.example).

```env
NODE_ENV=development
PORT=8080
```

### Executando

Ambiente de desenvolvimento:

```bash
pnpm dev
```

Ambiente de produção:

```bash
pnpm build
node .
```

### Lint

Verificar problemas de código:

```bash
pnpm lint
```

## Contribuição

Para orientações sobre como contribuir com o projeto, consulte: [CONTRIBUTING.md](CONTRIBUTING.md)
