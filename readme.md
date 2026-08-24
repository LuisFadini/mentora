# Mentora

O Mentora é o projeto integrador do curso técnico em informática.

O objetivo do projeto é desenvolver uma plataforma de estudos voltada para o ENEM e outros vestibulares, reunindo diferentes recursos em um único ambiente.

A versão final da aplicação deverá incluir:

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

### Ferramentas

- pnpm
- Docker
- ESLint
- Prettier

## Rodando o projeto

### Pré-requisitos

- Node.js 24+
- pnpm

Caso não tenha o pnpm instalado, veja <https://pnpm.io/installation>, em resumo:

```bash
npm install -g pnpm
```

### Instalação

Clone o repositório:

```bash
git clone https://github.com/luisfadini/mentora
cd mentora
```

Instale as dependências:

```bash
pnpm install
```

### Configuração

Crie um arquivo `.env` em [apps/api/](/apps/api/), siga o [`.env.example`](/apps/api/.env.example).

### Executando

Ambiente de desenvolvimento da api:

```bash
pnpm dev:api
```

Ambiente de desenvolvimento do frontend:

```bash
pnpm dev:web
```

Caso queira, pode se executar os dois projetos de uma vez, usando:

```bash
pnpm dev
```

### Lint

Verificar problemas de código:

```bash
pnpm lint
```

## Contribuição

Para orientações sobre como contribuir com o projeto, consulte: [CONTRIBUTING.md](CONTRIBUTING.md)
