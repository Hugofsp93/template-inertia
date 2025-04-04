# Template Rails + Inertia.js + React + Vite + TailwindCSS

Este é um template pré-configurado para iniciar projetos web modernos utilizando uma stack poderosa que combina o melhor do Ruby on Rails com tecnologias frontend modernas.

## 🚀 Stack Tecnológica

- **Backend:**
  - Ruby on Rails 7.2.2
  - PostgreSQL
  - Redis

- **Frontend:**
  - React
  - Inertia.js (para comunicação seamless entre Rails e React)
  - Vite (para build e desenvolvimento)
  - TailwindCSS

- **DevOps:**
  - Docker
  - Docker Compose

## 📋 Pré-requisitos

### Com Docker (Recomendado)
- Docker
- Docker Compose

### Sem Docker
- Ruby 3.x
- Node.js 18+ e Yarn
- PostgreSQL
- Redis

## 🛠 Configuração e Execução

### 🐳 Usando Docker (Recomendado)

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITÓRIO]
cd template-inertia
```

2. Configure o diretório para os dados do PostgreSQL:
```bash
mkdir -p ~/docker/postgres-data
```

3. Execute o script de setup que configurará tudo automaticamente:
```bash
./bin/docker-setup
```

Este script irá:
- Construir as imagens Docker
- Iniciar os containers
- Criar o banco de dados
- Executar as migrações
- Instalar as dependências do Node.js
- Iniciar a aplicação

A aplicação estará disponível em `http://localhost:3000`

#### 📝 Comandos Docker Úteis

- Iniciar a aplicação:
```bash
docker compose up
```

- Visualizar logs:
```bash
docker compose logs -f
```

- Executar comandos no container web:
```bash
docker compose exec web [comando]
```

- Parar todos os containers:
```bash
docker compose down
```

### 🖥 Instalação Local (Sem Docker)

1. Clone o repositório:
```bash
git clone [URL_DO_SEU_REPOSITÓRIO]
cd template-inertia
```

2. Instale as dependências do Ruby:
```bash
bundle install
```

3. Instale as dependências do Node.js:
```bash
yarn install
```

4. Configure o banco de dados:
```bash
rails db:create db:migrate
```

## 🚀 Rodando o Projeto

1. Inicie o servidor Rails e o Vite em modo de desenvolvimento:
```bash
./bin/dev
```

O projeto estará disponível em `http://localhost:3000`

## 🔍 Estrutura do Projeto

- `/app/javascript` - Componentes React e configurações frontend
- `/app/controllers` - Controllers Rails
- `/app/views` - Views Rails (mínimo, já que usamos Inertia)
- `/config` - Configurações do Rails e Vite

## 🧪 Testes

### Com Docker:
```bash
docker compose exec web rails test
```

### Sem Docker:
```bash
rails test
```

## 📚 Recursos Incluídos

- Configuração completa do Inertia.js
- Setup do TailwindCSS com plugins forms e typography
- Configuração do Vite para desenvolvimento rápido
- Estrutura básica React
- Configuração do PostgreSQL
- Configuração do Redis
- Ambiente de desenvolvimento otimizado
- Containerização completa com Docker
- Scripts de setup automatizado
- Volumes persistentes para dados do PostgreSQL e Redis

## 🔒 Segurança

O projeto inclui:
- Brakeman para análise de segurança
- Configurações seguras padrão do Rails
- CSRF protection via Inertia.js

## 📝 Licença

Este projeto está sob a licença MIT.

---

⭐ Desenvolvido como um template base para projetos Rails modernos com React.
