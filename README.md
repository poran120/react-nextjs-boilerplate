# React + Next.js Engineering Boilerplate

A scalable, production-ready **Next.js boilerplate** designed with clean architecture, modern frontend patterns, and strong developer experience.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

---

## Features

- **Next.js App Router** — File-based routing with React Server Components
- **TypeScript 5** — Strict mode with end-to-end type safety
- **Tailwind CSS v4** — Utility-first styling with custom design tokens
- **Server Actions** — Pre-built mutation helpers with auth, RBAC, and cache revalidation
- **Query Management** — URL-based state with `useCustomParams` hook and `queryExtractor`
- **Error Handling** — Route-level error boundaries, custom 404, and global loading states
- **Clean Architecture** — Enforced separation of concerns with scalable folder structure
- **Poppins Font** — Optimized via `next/font/google` with CSS variable
- **Glassmorphism UI** — Pre-built gradient backgrounds, glass cards, and glow effects
- **Vercel Ready** — Zero-config deployment to Vercel

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | React framework with App Router |
| React | 19.2.3 | UI library with Server Components |
| TypeScript | ^5 | Type-safe development |
| Tailwind CSS | ^4 | Utility-first CSS framework |
| ESLint | ^9 | Code quality (flat config) |

---

## Project Structure

```
src/
├── app/                    # Routes and pages (App Router)
│   ├── api/email/          # API route placeholder
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind + design tokens + custom utilities
│   ├── error.tsx           # Route-level error boundary
│   ├── layout.tsx          # Root layout (Poppins font, SEO metadata)
│   ├── loading.tsx         # Global loading state
│   ├── not-found.tsx       # Custom 404 page
│   └── page.tsx            # Home/landing page
│
├── assets/                 # Static assets (images, icons)
│   └── index.ts            # Asset exports
│
├── components/             # Reusable UI components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── shared/             # Shared cross-feature components
│   └── ui/                 # Base UI components
│
├── constants/              # Static configuration values
│   └── convention.api.constant.ts  # API URL constants
│
├── core/                   # Application infrastructure
│   ├── actions/            # Server Actions
│   │   ├── auth-actions.ts # Authentication (logout)
│   │   └── mutation.ts     # Generic CRUD mutation helper
│   └── cache/              # Cache revalidation utilities
│
├── helpers/                # Pure helper functions
│   └── array.ts            # sortBy, groupBy, uniqueArray
│
├── hooks/                  # Custom React hooks
│   └── useCustomParams.ts  # URL query parameter management
│
├── types/                  # Global TypeScript types
│   ├── paramsExtractor.type.ts  # Search params constants
│   └── queryExtractor.type.ts   # Query extractor type
│
└── utils/                  # Reusable utility functions
    ├── logger.ts           # Environment-aware console logger
    ├── paramsExtractor.ts  # Server-side search params parser
    └── queryExtractor.ts   # Client-side query string builder
```

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**

### 1. Clone the repository

```bash
# Using HTTPS
git clone https://github.com/poran120/react-nextjs-boilerplate.git

# Using SSH
git clone git@github.com:poran120/react-nextjs-boilerplate.git
```

### 2. Navigate to the project

```bash
cd react-nextjs-boilerplate
```

### 3. Install dependencies

```bash
npm install
```

### 4. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Client URL
NEXT_PUBLIC_CLIENT_BASE_URL=http://localhost:3000
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start development server with Turbopack |
| `build` | `npm run build` | Create production build |
| `start` | `npm run start` | Start production server |
| `lint` | `npm run lint` | Run ESLint checks |

---

## Architecture

### Folder Responsibilities

| Folder | Responsibility |
|---|---|
| `app/` | Routes, pages, layouts, API endpoints |
| `components/` | Reusable UI components (layout, shared, ui) |
| `hooks/` | Custom React hooks for stateful logic |
| `utils/` | Generic utility functions (no side effects) |
| `helpers/` | Pure helper functions for data transformation |
| `core/` | Application infrastructure (server actions, caching) |
| `types/` | Global TypeScript type definitions |
| `constants/` | Static configuration values and API URLs |
| `assets/` | Static assets (images, icons, fonts) |

### Key Utilities

#### `queryExtractor` — Build query strings for API calls

```typescript
import { queryExtractor } from "@/src/utils/queryExtractor";

const query = queryExtractor({
  searchTerm: "react",
  sortBy: "name",
  sortOrder: "asc",
  page: 1,
  limit: 10,
  extra: { category: "frontend" },
});
// Returns: "searchTerm=react&sortBy=name&sortOrder=asc&page=1&limit=10&category=frontend"
```

#### `paramsExtractor` — Parse search params on the server

```typescript
import { paramsExtractor } from "@/src/utils/paramsExtractor";

// In a Server Component
const { searchTerm, page, limit, filter } = await paramsExtractor({
  searchParam: searchParams,
});
```

#### `useCustomParams` — Client-side URL query management

```typescript
"use client";
import { useCustomParams } from "@/src/hooks/useCustomParams";

const { setQueryParam, removeQueryParam, getQueryParam, loading } =
  useCustomParams();

// Set a query param
setQueryParam({ page: "2", search: "nextjs" });

// Remove a query param
removeQueryParam("page");

// Read a query param
const search = getQueryParam("search");
```

#### `mutation` — Generic server action for CRUD operations

```typescript
import { mutation } from "@/src/core/actions/mutation";

// Create
const result = await mutation({
  route: "/users",
  method: "POST",
  data: JSON.stringify({ name: "John" }),
  pathToRevalidate: "/users",
});

// Delete
const result = await mutation({
  route: "/users",
  method: "DELETE",
  id: "123",
  pathToRevalidate: "/users",
});
```

#### `array` helpers — Type-safe array utilities

```typescript
import { sortBy, groupBy, uniqueArray } from "@/src/helpers/array";

sortBy(users, "name", "asc");
groupBy(orders, "status");
uniqueArray(items, "id");
```

---

## Styling

The project uses **Tailwind CSS v4** with a custom design token system:

- **CSS Variables** — Defined in `:root` for brand, neutral, and semantic colors
- **Tailwind Theme** — CSS variables mapped to Tailwind color tokens via `@theme inline`
- **Custom Utilities** — `.gradient-bg`, `.glass-card`, `.grid-overlay`, `.glow`
- **Font** — Poppins loaded via `next/font/google`

### Design Tokens

```css
--main-color: #ccfd3f;     /* Brand accent */
--brand: 147 51 234;       /* Purple (RGB) */
--brand-2: 59 130 246;     /* Blue (RGB) */
--success: #22c55e;        /* Green */
--warning: #f59e0b;        /* Amber */
--danger: #ef4444;         /* Red */
```

---

## Error Handling

| File | Purpose |
|---|---|
| `error.tsx` | Route-level error boundary with "Try Again" button |
| `not-found.tsx` | Custom 404 page with navigation links |
| `loading.tsx` | Global loading indicator during route transitions |

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | Yes | Backend API base URL |
| `NEXT_PUBLIC_CLIENT_BASE_URL` | Yes | Client-facing base URL |
| `NODE_ENV` | Auto | Set automatically by Next.js |

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js and configures the build
4. Set environment variables in the Vercel dashboard
5. Deploy

### Manual

```bash
npm run build
npm run start
```

---

## Commit Convention

This project follows a standardized commit message format:

```
<type>: <description>
```

| Type | Description |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `ui` | UI or styling changes |
| `update` | Update any code block |
| `refactor` | Code refactoring without changing behavior |
| `perf` | Performance improvements |
| `docs` | Documentation updates |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |
| `build` | Build system changes |
| `ci` | CI/CD related changes |
| `revert` | Reverting a previous commit |

**Rules:**
- Use present tense ("add", not "added")
- Do not capitalize the first letter
- Do not end with a period
- One logical change per commit

See [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) for full details.

---

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

## Author

**JAKER HOSSAIN** — Frontend Engineer at [Expert Squad](https://github.com/jackfd120)

Co-maintained by **SIFAYET**
