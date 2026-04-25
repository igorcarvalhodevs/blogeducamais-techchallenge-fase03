# BlogEducaMais — Tech Challenge (Fase 03)

Aplicação **fullstack** para gestão de conteúdo educacional, composta por:

- Backend em Node.js + Express (API REST)
- Frontend em React (Vite)
- Persistência em PostgreSQL via Prisma ORM
- Containerização com Docker
- CI com GitHub Actions

O sistema permite que:
- **Alunos** consumam conteúdo (leitura, busca, comentários)
- **Professores** gerenciem postagens (CRUD completo)

---

## Sumário

- Contexto do problema
- Escopo e requisitos
- Arquitetura
- Tecnologias
- Regras de acesso (aluno x professor)
- Endpoints (API)
- Frontend (funcionalidades)
- Como rodar o projeto
- Testes e cobertura
- CI/CD
- Decisões técnicas
- Segurança
- Próximos passos

---

## Contexto do problema

Professores da rede educacional frequentemente não possuem uma plataforma centralizada, simples e eficiente para publicação de conteúdos e interação com alunos.

Este projeto evolui a solução anterior (Fase 02), expandindo:

- Interface gráfica completa (React)
- Autenticação real via JWT
- Sistema de comentários
- Controle de acesso por perfil

---

## Escopo e requisitos

### Funcionais

#### Alunos

- Visualizar posts
- Buscar por conteúdo
- Ler post completo
- Comentar

#### Professores

- Criar post
- Editar post
- Excluir post
- Acessar área administrativa

---

### Técnicos

- Frontend em React (hooks + SPA)
- Backend em Node.js + Express
- Banco PostgreSQL
- ORM Prisma
- Autenticação via JWT
- Docker (API + banco)
- CI com GitHub Actions
- Testes automatizados (Jest)

---

## Arquitetura

blogeducamais-techchallenge-fase03

```bash
├── backend
│ ├── src
│ │ ├── modules (auth, posts, comments)
│ │ ├── middlewares
│ │ └── config
│ ├── prisma
│ ├── tests
│ ├── Dockerfile
│ └── docker-compose.yml
│
├── frontend
│ ├── src
│ │ ├── pages
│ │ ├── components
│ │ ├── services
│ │ └── contexts
```

---

## Tecnologias

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod

### Frontend

- React
- Vite
- React Router
- Axios
- Context API

### Infra

- Docker
- Docker Compose
- GitHub Actions

---

## Regras de acesso

### Aluno

- Acesso livre a leitura
- Pode comentar

### Professor

- CRUD completo de posts
- Acesso à área administrativa

Autenticação baseada em JWT (JSON Web Token).

Para acessar rotas protegidas, é necessário enviar o token no header HTTP:

```bash
Authorization: Bearer <token>
```

---

## Endpoints principais

### Auth

```bash
POST /auth/login
```

---

### Posts

```bash
GET    /posts
GET    /posts/:id
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
```

---

### Comments

```bash
GET  /posts/:postId/comments
POST /posts/:postId/comments
```

---

## Frontend (funcionalidades)

- Listagem de posts
- Busca por palavras-chave
- Página de leitura completa
- Comentários por post
- Área administrativa
- Criação e edição de posts
- Proteção de rotas (professor)

---

## Como rodar o projeto

### Backend (Docker)

```bash
cd backend
docker-compose up --build
```

### API:

```bash
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### App:

```bash
http://localhost:5173
```

---

### Testes e cobertura

```bash
cd backend
npm run test
npm run test:coverage
```

### Cobertura aproximada:

- Statements: ~87%
- Branches: ~83%
- Functions: 100%
- Lines: ~86%

---

### CI/CD (GitHub Actions)

Pipeline executa:

- npm install
- prisma generate
- banco PostgreSQL (container)
- migrations
- testes com cobertura
- build Docker

---

### Decisões técnicas

- Prisma → produtividade e migrations
- PostgreSQL → robustez e aderência ao SQL
- Express → simplicidade e controle
- React → SPA moderna
- Context API → gerenciamento leve de estado
- JWT → autenticação stateless

---

### Segurança

- Validação de payload (Zod)
- Middleware de autenticação
- Controle de acesso por role
- Tratamento de erros HTTP
- Preparado para RBAC completo

---

### Próximos passos

- RBAC completo (roles dinâmicas)
- Paginação
- Logs estruturados
- Rate limiting
- Versionamento de API
- Deploy em cloud

---

## Documentação Completa

O projeto possui um relatório técnico detalhado com:

- Arquitetura completa do sistema
- Modelagem de dados (Prisma)
- Decisões técnicas justificadas
- Fluxo de autenticação
- Integração frontend ↔ backend
- Estratégias de testes
- Desafios enfrentados e soluções adotadas

Acesse o documento completo:

`backend/docs/RELATORIO.md`

---

### Conteúdo do relatório

O relatório inclui:

- Introdução ao problema
- Levantamento de requisitos
- Desenho arquitetural (backend + frontend)
- Estrutura de diretórios explicada
- Fluxo de requisição completo
- Estratégia de autenticação (JWT)
- Modelagem do banco de dados
- Implementação do sistema de comentários
- Testes automatizados e cobertura
- CI/CD com GitHub Actions
- Desafios técnicos enfrentados
- Melhorias futuras

---

## Demonstração da Aplicação

Este vídeo apresenta uma demonstração completa do funcionamento da aplicação BlogEducaMais, incluindo:

### Fluxo do aluno
- Listagem de posts
- Busca por palavras-chave
- Leitura completa de post
- Criação de comentários

### Fluxo do professor
- Login na aplicação
- Criação de postagem
- Edição de postagem
- Exclusão de postagem
- Acesso à área administrativa

### Aspectos técnicos demonstrados
- Integração frontend ↔ backend
- Persistência de dados no banco
- Autenticação via JWT
- Proteção de rotas
- Responsividade da interface

---

### Assista ao vídeo:

-> https://youtu.be/1BTxb_eixBg

---

### Autor

Igor Carvalho