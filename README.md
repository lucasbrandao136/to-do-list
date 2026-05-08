# TaskFlow

Projeto full-stack de gerenciamento de tarefas que desenvolvi para praticar Vue 3, Node.js e PostgreSQL. A ideia foi criar uma lista de tarefas, com autenticação, organização por listas e uma interface que ficasse agradável de usar.

## O que tem no projeto

- Cadastro e login com autenticação JWT
- Upload de foto de perfil (Cloudinary)
- Criar, editar, excluir e concluir tarefas
- Organizar tarefas em listas com cores
- Drag and drop entre listas
- Tarefas sem lista ficam em uma área separada
- Feedback visual em todas as ações

## Stack

**Frontend**
- Vue 3 com Composition API e `<script setup>`
- TypeScript
- Pinia para estado global
- Vue Router
- Tailwind CSS

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL
- JWT + bcrypt
- Arquitetura MVC (Models, Controllers, Routes)

## Como rodar localmente

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+

### Banco de dados

Crie um banco chamado `todolistdb` e rode o `sql/init.sql` para criar as tabelas.

### Variáveis de ambiente

Crie um arquivo `.env` dentro de `backend/`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=todolistdb
JWT_SECRET=uma_chave_qualquer
```

### Instalação e execução

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (em outro terminal)
cd frontend
npm install
npm run serve
```

O frontend sobe em `http://localhost:8080` e já está configurado para redirecionar as chamadas de API para o backend em `localhost:3000`.

## Estrutura

```
to-do-list/
├── backend/
│   └── src/
│       ├── config/        # Conexão com o banco
│       ├── controllers/   # Lógica de negócio (C do MVC)
│       ├── middlewares/   # Autenticação JWT
│       ├── models/        # Queries SQL (M do MVC)
│       └── routes/        # Definição dos endpoints (V do MVC — interface com o cliente)
├── frontend/
│   └── src/
│       ├── components/    # Componentes reutilizáveis
│       ├── views/         # Páginas
│       ├── stores/        # Estado global (Pinia)
│       ├── services/      # Chamadas à API
│       └── router/        # Rotas do Vue Router
└── sql/
    └── init.sql           # Script de criação do banco
```

## Endpoints principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/register` | Cadastro |
| POST | `/api/login` | Login |
| GET | `/api/profile` | Dados do perfil |
| GET | `/api/todos` | Listar tarefas |
| POST | `/api/new/todo` | Criar tarefa |
| PUT | `/api/todo/:id` | Editar tarefa |
| DELETE | `/api/todo/:id` | Excluir tarefa |
| PATCH | `/api/todo/:id/toggle` | Marcar como concluída |
| PATCH | `/api/todo/:id/associate` | Mover para lista |
| GET | `/api/lists` | Listar listas com tarefas |
| POST | `/api/list` | Criar lista |
| DELETE | `/api/list/:id` | Excluir lista |

## Possíveis melhorias futuras

Algumas coisas que ficaram de fora por enquanto mas que quero implementar:

- [ ] Editar foto de perfil depois do cadastro
- [ ] Filtrar e ordenar tarefas (por data, status, lista)
- [ ] Tarefas com subtarefas
- [ ] Notificações de tarefas vencidas
- [ ] Modo escuro
- [ ] Compartilhar listas com outros usuários
- [ ] Versão mobile nativa
