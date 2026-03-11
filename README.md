# React + Next.js Engineering Boilerplate

A scalable, production-ready **Next.js boilerplate** designed with clean architecture, modern frontend patterns, and strong developer experience.

This template provides a structured foundation for building maintainable React applications using **Next.js App Router, TypeScript, and Tailwind CSS**.

---

## Features

- Next.js App Router
- TypeScript support
- Tailwind CSS styling
- Clean scalable folder structure
- Global error handling
- Custom `not-found` page
- Loading states
- Modular architecture
- Reusable components
- Utility-first development
- Production-ready configuration

---

## Project Structure

```
src
├─ app
│  ├─ styles
│  │  └─ globals.css
│  ├─ error.tsx
│  ├─ layout.tsx
│  ├─ loading.tsx
│  ├─ not-found.tsx
│  └─ page.tsx
│
├─ assets
│
├─ components
│  Reusable UI components
│
├─ constants
│  Static configuration values
│
├─ core
│  Application core logic and services
│
├─ helpers
│  Helper functions
│
├─ hooks
│  Custom React hooks
│
├─ types
│  Global TypeScript types
│
├─ utils
│  Reusable utility functions
```

---

## Getting Started

### 1️⃣ Clone the repository

```
git clone <your-repo-url>
```

### 2️⃣ Install dependencies

```
npm install
```

or

```
yarn install
```

### 3️⃣ Run the development server

```
npm run dev
```

The application will start at:

```
http://localhost:3000
```

---

## Available Scripts

| Script          | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run development server  |
| `npm run build` | Build production app    |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |

---

## Error Handling

This boilerplate includes:

- `error.tsx` → route-level error handling
- `global-error.tsx` → global application errors
- `not-found.tsx` → custom 404 page
- `loading.tsx` → route loading UI

---

## Styling

This project uses **Tailwind CSS** with a scalable design token system defined in global CSS.

Key features:

- CSS variables
- Design tokens
- Semantic color system
- Utility-first styling

---

## Development Philosophy

This boilerplate focuses on:

- Maintainable architecture
- Scalable folder structure
- Clear separation of concerns
- Modern React patterns
- Production-ready setup

---

## License

MIT License

---

## Author

Maintained by **JAKER HOSSAIN & SIFAYET**
