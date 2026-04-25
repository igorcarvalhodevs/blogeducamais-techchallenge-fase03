# Frontend — BlogEducaMais

Aplicação SPA desenvolvida em React responsável pela interface do usuário do sistema BlogEducaMais, consumindo a API REST do backend.

---

## Visão geral

O frontend permite a interação completa com o sistema, incluindo:

- Visualização de posts educacionais
- Busca por conteúdo
- Leitura detalhada de postagens
- Criação de comentários (alunos)
- Autenticação de usuários
- Área administrativa para professores
- CRUD completo de postagens (professores)

---

## Tecnologias utilizadas

- React
- Vite
- React Router DOM
- Axios
- Context API
- CSS responsivo

---

## Estrutura do projeto

```bash
src/
├── pages/
│   ├── Home.jsx
│   ├── PostDetail.jsx
│   ├── Login.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   └── Admin.jsx
│
├── components/
│   ├── Layout.jsx
│   ├── Header.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   ├── postsService.js
│   ├── commentsService.js
│   └── authService.js
│
├── contexts/
│   └── AuthContext.jsx
│
├── styles/
│   └── global.css
│
└── App.jsx
```

---

## Páginas da aplicação

### Home

- Listagem de posts
- Busca por título e conteúdo
- Visualização resumida (excerpt)

---

### PostDetail

- Exibição completa do post
- Exibição de comentários
- Criação de comentários (aluno autenticado)

---

### Login

- Autenticação de usuários
- Armazenamento de token JWT

---

### CreatePost

- Criação de nova postagem
- Acesso restrito a professores

---

### EditPost

- Edição de post existente
- Carregamento prévio dos dados

---

### Admin

- Listagem administrativa
- Edição e exclusão de posts

---

## Integração com backend

A comunicação com a API REST é realizada via Axios.

A API padrão está disponível em:

```bash
http://localhost:3000
```

Serviços implementados:

- `postsService` → operações de posts
- `commentsService` → gerenciamento de comentários
- `authService` → autenticação

---

## Autenticação

- Baseada em JWT (JSON Web Token)
- Token armazenado no contexto global utilizando Context API
- Enviado automaticamente nas requisições protegidas

---

## Proteção de rotas

- Componente `ProtectedRoute`
- Controle de acesso por perfil (teacher / student)
- Redirecionamento automático para login quando necessário

---

## Como rodar o frontend

```bash
npm install
npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```

---

## Variáveis de ambiente

Caso necessário, configure:

```env
VITE_API_URL=http://localhost:3000
```

---

## Responsividade

A interface foi desenvolvida com foco em responsividade:

- Layout adaptado para mobile, tablet e desktop
- Tabelas com scroll horizontal em telas pequenas
- Botões e inputs adaptáveis
- Quebra de texto para melhor leitura de conteúdos longos

---

## Funcionalidades implementadas

- Listagem de posts
- Busca por palavras-chave
- Visualização detalhada
- Sistema de comentários
- Login de usuários
- CRUD de posts (professores)
- Área administrativa
- Proteção de rotas

---

## Tratamento de erros

- Feedback visual para falhas de requisição
- Mensagens de erro ao usuário
- Controle de loading durante chamadas à API

---

## Arquitetura

- Separação entre lógica e apresentação
- Serviços isolados para comunicação com API
- Context API para gerenciamento de estado global
- Componentização reutilizável

---

## Decisões técnicas

- React → construção de SPA moderna
- Vite → build rápido e ambiente leve
- Context API → gerenciamento simples de estado global
- Axios → padronização de requisições HTTP

---

## Melhorias futuras

- Paginação de posts
- Notificações ao usuário
- Melhorias de UX/UI
- Lazy loading de componentes
- Testes automatizados (frontend)

---

## Autor

Igor Carvalho