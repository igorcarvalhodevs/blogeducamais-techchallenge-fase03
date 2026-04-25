# Relatório Técnico — BlogEducaMais (Tech Challenge Fase 03)

---

## 1. Visão geral do projeto

O BlogEducaMais é uma aplicação fullstack desenvolvida com o objetivo de fornecer uma plataforma educacional para publicação e consumo de conteúdos didáticos.

A solução é composta por:

- Backend: API REST em Node.js + Express
- Frontend: aplicação SPA em React (Vite)
- Banco de dados: PostgreSQL
- ORM: Prisma
- Infraestrutura: Docker + Docker Compose
- Automação: GitHub Actions (CI/CD)

O sistema permite que:

- Alunos consumam conteúdo educacional (leitura, busca e comentários)
- Professores gerenciem conteúdos (CRUD completo de postagens)

---

## 2. Evolução em relação à Fase 02

Esta fase representa uma evolução significativa do projeto anterior, incorporando:

- Interface gráfica completa (frontend em React)
- Sistema de autenticação real via JWT
- Implementação de comentários
- Separação clara entre camadas frontend e backend
- Proteção de rotas baseada em autenticação
- Integração completa entre client e API

---

## 3. Requisitos implementados

### 3.1 Funcionais

#### Alunos

- Listar posts (`GET /posts`)
- Buscar posts (`GET /posts/search`)
- Visualizar detalhes (`GET /posts/:id`)
- Criar comentários

#### Professores

- Criar posts (`POST /posts`)
- Editar posts (`PUT /posts/:id`)
- Excluir posts (`DELETE /posts/:id`)
- Acessar área administrativa
- Autenticar-se no sistema

---

### 3.2 Endpoints REST

#### Auth

- POST /auth/login

#### Posts

- GET /posts
- GET /posts/:id
- GET /posts/search?term=...
- POST /posts
- PUT /posts/:id
- DELETE /posts/:id

#### Comments

- GET /posts/:postId/comments
- POST /posts/:postId/comments

---

## 4. Arquitetura do sistema

### 4.1 Organização geral

O projeto foi estruturado em dois módulos principais:

```bash
blogeducamais-techchallenge-fase03/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── posts/
│   │   │   └── comments/
│   │   ├── middlewares/
│   │   └── config/
│   ├── prisma/
│   ├── tests/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── contexts/
│   │   └── styles/
```

---

### 4.2 Backend

Estrutura modular baseada em separação de responsabilidades:

- routes → definição de endpoints
- middlewares → autenticação e autorização
- validators → validação de dados
- controllers → interface HTTP
- services → regras de negócio
- config → conexão com banco (Prisma)

---

### 4.3 Frontend

Aplicação SPA estruturada em:

- pages → telas principais
- components → componentes reutilizáveis
- services → consumo da API
- contexts → gerenciamento de estado global (Auth)

---

## 5. Fluxo de requisição

Exemplo: criação de post

1. Usuário autenticado envia requisição via frontend
2. Frontend envia POST /posts com token JWT
3. Middleware valida token
4. Validator valida payload
5. Controller processa requisição
6. Service executa lógica de negócio
7. Prisma persiste dados no PostgreSQL
8. API retorna resposta HTTP (201)

---

## 6. Persistência e modelagem de dados

### 6.1 Banco de dados

- PostgreSQL 16
- Executado via Docker e CI

---

### 6.2 Modelagem (Prisma)

Entidade Post

- id
- title
- content
- author
- createdAt
- updatedAt

Entidade Comment

- id
- content
- author
- userRole
- postId (FK)
- createdAt

---

### 6.3 Relacionamento

- 1 Post → N Comments
- Exclusão em cascata (onDelete: Cascade)

---

## 7. Autenticação e controle de acesso

### 7.1 Estratégia adotada

Foi implementado um sistema de autenticação baseado em:

- JWT (JSON Web Token)
- Middleware de verificação de token

---

### 7.2 Fluxo de autenticação

1. Usuário realiza login (/auth/login)
2. API retorna token JWT
3. Frontend armazena token
4. Requisições protegidas enviam:

```bash
Authorization: Bearer <token>
```

---

### 7.3 Controle de acesso

- Rotas públicas → leitura
- Rotas protegidas → exigem autenticação
- Possibilidade futura de RBAC (roles dinâmicas)

---

## 8. Frontend

### 8.1 Funcionalidades implementadas

- Listagem de posts
- Busca por palavras-chave
- Visualização detalhada
- Sistema de comentários
- Login de usuário
- Área administrativa
- Criação e edição de posts
- Proteção de rotas

---

### 8.2 Arquitetura de estado

- Context API para autenticação
- Serviços isolados para chamadas HTTP
- Separação entre lógica e UI

---

## 9. Containerização (Docker)

### 9.1 Backend

- Dockerfile baseado em node:20
- Execução de migrations no startup
- Build reprodutível

---

### 9.2 Docker Compose

Orquestra:

- PostgreSQL
- API

Com:

- Healthcheck
- Variáveis de ambiente
- Persistência via volume

---

## 10. CI/CD (GitHub Actions)

Pipeline automatizado executa:

- Instalação de dependências
- Prisma generate
- Subida de banco (container)
- Execução de migrations
- Testes automatizados
- Verificação de cobertura
- Build Docker

---

## 11. Testes e cobertura

### 11.1 Ferramentas

- Jest
- Supertest

---

### 11.2 Estratégia

- Testes de integração (API)
- Testes unitários (services)
- Testes de validação

---

### 11.3 Cobertura

- Statements: ~87%
- Branches: ~83%
- Functions: 100%
- Lines: ~86%

---

## 12. Tratamento de erros

- 400 → validação
- 401 → não autenticado
- 403 → acesso negado
- 404 → recurso inexistente
- 500 → erro interno

---

## 13. Segurança

- Validação de payloads com Zod antes do acesso ao banco
- Autenticação baseada em JWT (stateless)
- Middleware de proteção de rotas
- Separação de camadas para evitar acoplamento indevido
- Estrutura preparada para RBAC (Role-Based Access Control)
- Evita exposição direta de lógica de negócio nas rotas

---

## 14. Desafios enfrentados

### 14.1 Integração frontend ↔ backend

Desafio: padronizar comunicação entre camadas com diferentes responsabilidades.

Solução: centralização das chamadas HTTP em serviços e padronização de responses.

---

### 14.2 Autenticação JWT

Solução: middleware dedicado e controle centralizado via context.

---

### 14.3 Sincronização com banco (Docker + CI)

Solução: migrations automatizadas.

---

### 14.4 Organização de código fullstack

Solução: separação clara entre frontend e backend.

---

## 15. Conclusão

O projeto BlogEducaMais Fase 03 representa uma evolução consistente para uma arquitetura fullstack moderna, integrando frontend e backend de forma coesa, com boas práticas de desenvolvimento, testes e automação.

---

## 16. Próximas melhorias

- RBAC completo
- Paginação
- Logs estruturados
- Rate limiting
- Deploy em cloud
- Monitoramento (observabilidade)

---

## 17. Demonstração da aplicação

O sistema foi validado por meio de execução completa das funcionalidades:

- CRUD de posts
- Autenticação de usuários
- Comentários
- Integração frontend ↔ backend

O vídeo demonstrativo encontra-se disponível em:

-> https://youtu.be/1BTxb_eixBg

---

## 18. Considerações finais

O projeto atende aos requisitos técnicos e funcionais do desafio, apresentando uma base sólida para evolução futura e aplicação em cenários reais.