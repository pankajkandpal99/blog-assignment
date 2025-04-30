# DevInsight - Full Stack Blog Platform with RBAC

![Tech Stack](https://img.shields.io/badge/React-19-blue) ![Tech Stack](https://img.shields.io/badge/TypeScript-5.7-blue) ![Tech Stack](https://img.shields.io/badge/Express-4.21-green) ![Tech Stack](https://img.shields.io/badge/MongoDB-8.13-green)

A secure, full-stack blog platform with Role-Based Access Control (RBAC) built with React, Express, and MongoDB. Features authentication, authorization, and transactional database operations.

## Features

- **Role-Based Access Control (RBAC)**
  - Admin: Create, update, delete any blog post
  - User: Read posts and bookmark favorites
- **Secure Authentication**
  - JWT token system with protected routes
  - Password hashing with bcryptjs
- **Modern UI Components**
  - Built with shadcn/ui components
  - Animated with Framer Motion
  - Styled with Tailwind CSS
- **Robust Backend**
  - Express.js with MongoDB (Mongoose ODM)
  - Transaction model for database operations
  - Comprehensive security middleware:
    - Helmet, CORS, rate limiting
    - Express with Zod validator, XSS protection
    - Mongo sanitization
- **Form Validation**
  - Client-side: Zod schema validation
  - Server-side: Express validator
- **State Management**
  - Redux Toolkit for global state
  - React Hook Forms for form management

## Tech Stack

**Client:**

- React 19 (Vite)
- TypeScript
- Tailwind CSS + shadcn/ui
- Redux Toolkit
- Framer Motion
- Zod for validation
- React Hook Form

**Server:**

- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Winston logging
- Transactional operations
- Rate limiting
- Security middleware

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas URI)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pankajkandpal99/blog-assignment.git
   cd dev-insight
   ```

2. Set up the client
cd client
npm install

3. cd server
npm install

4. Environment Variables
Create .env files in both client and server directories:

**Client .env:
VITE_API_BASE_URL=your_backend_server_port

**Server .env:
# Environment: development | production | test
NODE_ENV=development

# Server Port
PORT=8800

# JWT Secret Key (Use a long random string in production)
JWT_SECRET=your_jwt_secret_here

# MongoDB connection string
DATABASE_URL=mongodb://localhost:27017/your-database-name

# Domain for setting cookies (e.g., localhost or your custom domain)
COOKIE_DOMAIN=localhost

# Comma-separated list of allowed CORS origins
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:8800

# Base URL of your backend
BASE_URL=http://localhost:8800

Project Structure:
dev-insight/
├── client/                   # React frontend
│   ├── src/                  # Source files
│   │   ├── components/       # Reusable components
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Route pages
│   │   ├── store/            # Redux store
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   └── vite.config.ts        # Vite configuration
│
├── server/                   # Express backend
│   ├── src/                  # Source files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Custom middleware
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript types
│   │   └── utils/            # Utility functions
│   └── tsconfig.json         # TypeScript config
└── README.md                 # Project documentation

This README includes:

1. Project overview with badges
2. Key features list
3. Complete tech stack
4. Detailed installation instructions
5. Project structure
6. API endpoints table
7. Future plans
8. Contribution guidelines

You can directly copy this into your VS Code's README.md file. The formatting uses standard Markdown that will render perfectly on GitHub. Let me know if you'd like to add or modify any sections!