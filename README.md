# CRM WhatsApp Frontend

> Frontend React para CRM com Dashboard, Chat WhatsApp integrado e Gestão de Contatos

## 🚀 Funcionalidades

- ✅ Dashboard em tempo real com estatísticas
- ✅ Interface de chat integrada com WhatsApp
- ✅ Gráficos interativos com Recharts
- ✅ Sistema de contatos com busca
- ✅ Conexão em tempo real via Socket.IO
- ✅ Design moderno e responsivo
- ✅ Interface amigável com Tailwind CSS

## 📋 Pré-requisitos

- Node.js v16 ou superior
- npm ou yarn
- Backend Node.js rodando em `http://localhost:3000`

## 🛠️ Instalação

```bash
# Clonar repositório
git clone https://github.com/maestroicaro/crm-whatsapp-frontend.git
cd crm-whatsapp-frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

## 🌍 Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

## ▶️ Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview de produção
npm run preview
```

O frontend estará disponível em `http://localhost:5173`

## 🎨 Tecnologias

- **React 18** - UI Library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Gráficos
- **Socket.IO Client** - Comunicação em tempo real
- **Axios** - HTTP Client
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard.jsx
│   ├── ChatWindow.jsx
│   └── ...
├── App.jsx
├── main.jsx
└── styles/
```

## 🔗 Integração com Backend

O frontend se conecta ao backend Node.js através de:
- **REST API** via Axios
- **WebSocket** via Socket.IO para mensagens em tempo real

## 📝 Licença

MIT

## 👨‍💻 Autor

**Ícaro Gonçalves** - [@maestroicaro](https://github.com/maestroicaro)
