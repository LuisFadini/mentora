# Endpoints

- [Usuários](#usuários)
- [Auth](#auth)

---

## Usuários

### GET /users

Lista todos os usuários cadastrados.

Response 200:

```json
[
  {
    "id": "uuid",
    "name": "Exemplo",
    "email": "exemplo@example.com",
    "avatarUrl": "https://...",
    "createdAt": "2026-04-03T00:00:00Z",
    "updatedAt": "2026-04-03T00:00:00Z"
  }
]
```

---

### POST /users

Cria um novo usuário.

Body

```json
{
  "name": "Exemplo",
  "email": "exemplo@example.com",
  "password": "12345678",
  "avatarUrl": "https://..."
}
```

Regras

- name: mínimo 4 caracteres
- email: formato válido
- password: mínimo 8 caracteres

Response 201:

```json
{
  "id": "uuid",
  "name": "Exemplo",
  "email": "exemplo@example.com",
  "avatarUrl": "https://...",
  "createdAt": "2026-04-03T00:00:00Z",
  "updatedAt": "2026-04-03T00:00:00Z"
}
```

Erros:

- 400: corpo inválido

---

### GET /users/:id

Busca um usuário pelo ID.

Params

- id (UUID)

Response 200:

```json
{
  "id": "uuid",
  "name": "Exemplo",
  "email": "exemplo@example.com",
  "avatarUrl": "https://...",
  "createdAt": "2026-04-03T00:00:00Z",
  "updatedAt": "2026-04-03T00:00:00Z"
}
```

Erros:

- 404: usuário não encontrado

---

### PATCH /users/:id

Atualiza dados de um usuário.

Params

- id (UUID)

Body (todos opcionais)

```json
{
  "name": "Novo Nome",
  "email": "novo@email.com",
  "password": "novaSenha123",
  "avatarUrl": "https://..."
}
```

Regras

- name: mínimo 4 caracteres (se enviado)
- password: mínimo 8 caracteres (se enviado)

Response 200:

```json
{
  "id": "uuid",
  "name": "Novo Nome",
  "email": "novo@email.com",
  "avatarUrl": "https://...",
  "createdAt": "2026-04-03T00:00:00Z",
  "updatedAt": "2026-04-03T00:00:00Z"
}
```

Erros:

- 400: corpo inválido
- 404: usuário não encontrado

---

## Auth

### POST /auth

Cria uma sessão (login do usuário).

Body

```json
{
  "email": "exemplo@example.com",
  "password": "12345678"
}
```

Response 200:

Erros:

- 401: senha incorreta
- 404: usuário não encontrado

---

### DELETE /auth

Encerra a sessão do usuário (logout).

Response 200:

```json
{
  "message": "Session closed successfully"
}
```

Erros:

- 400: erro ao encerrar sessão

---

### Padrão de erro

```json
{
  "error": "Mensagem de erro"
}
```
