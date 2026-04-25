# Backend — BlogEducaMais

API REST responsável pela autenticação, gerenciamento de posts e comentários da aplicação BlogEducaMais.

---

## Visão geral

O backend foi desenvolvido em Node.js utilizando Express, seguindo uma arquitetura modular com separação clara de responsabilidades.

Responsável por:

- Autenticação de usuários (JWT)
- CRUD de postagens
- Gerenciamento de comentários
- Persistência em banco de dados PostgreSQL
- Validação de dados e controle de acesso

---

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Zod (validação)
- Jest (testes)
- Supertest

---

## Estrutura do projeto

```bash
src/
├── modules/
│   ├── auth/
│   ├── posts/
│   └── comments/
├── middlewares/
├── config/
└── server.js

prisma/
tests/
Dockerfile
docker-compose.yml
.env
``` 

---

## Endpoints da API

### Auth

- `POST /auth/login`

---

### Posts

- `GET /posts`
- `GET /posts/:id`
- `GET /posts/search?term=...`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

---

### Comments

- `GET /posts/:postId/comments`
- `POST /posts/:postId/comments`

---

## Autenticação

A autenticação é baseada em JWT (JSON Web Token).

Para acessar rotas protegidas, o cliente deve enviar o token no header HTTP:

```bash
Authorization: Bearer <token>
```

---


## Controle de acesso

- Rotas públicas → leitura
- Rotas protegidas → exigem autenticação
- Middleware `requireAuth` → valida token JWT
- Middleware `requireRole` → controla permissões por perfil (ex.: teacher)

---

## Configuração do ambiente

Crie um arquivo `.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/blogdb?schema=public
PORT=3000
JWT_SECRET=super_secret_key_blogeducamais
```

---

## Como rodar o backend

Usando Docker

```bash
docker-compose up --build
```

#### API disponível em:

```bash
http://localhost:3000
```

---

#### Rodando localmente

```bash
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

## Testes

#### Executar testes

```bash
npm run test
```

#### Cobertura

```bash
npm run test:coverage
```

#### Cobertura aproximada:

- Statements: ~87%
- Branches: ~83%
- Functions: 100%
- Lines: ~86%

---

## Banco de dados

#### Entidade Post

- id
- title
- content
- author
- createdAt
- updatedAt

---

#### Entidade Comment

- id
- content
- author
- userRole
- postId
- createdAt

---

#### Relacionamento

- 1 Post → N Comments
- Exclusão em cascata

---

## Tratamento de erros

- 400 → validação
- 401 → não autenticado
- 403 → acesso negado
- 404 → recurso inexistente
- 500 → erro interno

---

## Segurança

- Validação de payload com Zod
- Autenticação via JWT
- Middleware de proteção de rotas
- Separação de camadas
- Estrutura preparada para RBAC

---

## Docker

#### O backend é containerizado utilizando:

- Node.js (API)
- PostgreSQL (banco)

#### Executa automaticamente:

- Prisma generate
- Execução de migrations (`prisma migrate deploy`)

---

## Decisões técnicas

- Prisma → abstração de banco e produtividade
- PostgreSQL → robustez e compatibilidade SQL
- Express → leve e flexível
- JWT → autenticação stateless

---
 
## Documentação técnica

#### Relatório completo disponível em:

`docs/RELATORIO.md`

---

## Autor

Igor Carvalho