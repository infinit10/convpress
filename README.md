# 🗜️ Convpress

Convpress is a web application that allows you to **convert** and **compress** image and PDF files with ease. Designed with performance and simplicity in mind, it provides a user-friendly interface and powerful backend services.

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
- [Node.js (v16+ recommended)](https://nodejs.org/)
- `pip` & `npm`

### 📦 Installation

Clone the repository:

```bash
git clone https://github.com/infinit10/convpress.git
cd convpress
```


Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

Install React (frontend) dependencies:

````bash
cd ../frontend
npm install
````

### ▶️ Running the Development Server

Start the development server:

````bash
make dev
````

This will:
- Start the Flask backend on port 5000
- Start the React frontend (usually on port 3000)
- Enable hot-reload for both backend and frontend

## 🧪 Scripts

Some useful Makefile commands:

| Command       | Description                             |
|---------------|-----------------------------------------|
| `make dev`    | Run both frontend and backend           |
| `make build`  | Build production frontend               |
| `make lint`   | Lint Python and JS code (if setup)      |
| `make clean`  | Remove cache and temporary files        |

