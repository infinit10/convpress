# 🗜️ Convpress

**Convpress** is a web application that allows you to **convert** and **compress** image and PDF files with ease. Designed with performance and simplicity in mind, it provides a user-friendly interface and powerful backend services.

## 🚀 Features

- ✅ Fast and efficient file conversion
- 📦 Image compression with size and quality optimization
- 🖼️ Supports image formats: JPG, PNG (more formats coming soon!)
- 📄 PDF compression
- 🌐 Intuitive web interface built with React
- ⚙️ Backend powered by Flask

## 🛠️ Getting Started

### ✅ Prerequisites

- [Python 3.8+](https://www.python.org/)
- [Node.js](https://nodejs.org/) (see `frontend/.nvmrc` for the required version)
- [Docker](https://www.docker.com/) (for local containerized builds)
- `pip` & `npm`

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/infinit10/convpress.git
cd convpress
```

Install frontend dependencies:

```bash
make install-web-dependencies
```

Install backend dependencies:

```bash
make install-server-dependencies
```

### ▶️ Running the Development Server

Start the development server:

```bash
make dev
```

This will:

- Start the Flask backend on port 5000
- Start the React frontend with Vite
- Enable hot-reload for both backend and frontend

### 🐳 Local Docker Build

Build and run the application locally using Docker:

```bash
make build-local
```

## 🧪 Makefile Commands

Run `make help` to see all available targets.

| Command | Description |
| --- | --- |
| **Development** | |
| `make dev` | Run Vite and Flask dev server |
| **Build** | |
| `make build-local` | Build Docker image for local development |
| `make build-web` | Build frontend for production |
| **Deploy** | |
| `make deploy-web` | Deploy frontend to Cloudflare Pages |
| **Dependencies** | |
| `make install-web-dependencies` | Install frontend npm dependencies |
| `make install-server-dependencies` | Install backend pip dependencies |
| **Linting** | |
| `make ts_lint` | Run TypeScript linter |
| `make py_lint` | Run Python linter |
| `make lint` | Run all linters |
| **Cleanup** | |
| `make clean` | Remove Docker images |

## 🚢 CI/CD

The project uses GitHub Actions for continuous integration and deployment.

| Workflow | Trigger | Description |
| --- | --- | --- |
| **Run Tests** | Every push | Lints TypeScript and Python code |
| **Deploy Web App** | Manual (`workflow_dispatch`) | Builds and deploys the frontend to Cloudflare Pages |
| **Deploy Server** | Manual (`workflow_dispatch`) | Builds and deploys the backend to Fly.io |
