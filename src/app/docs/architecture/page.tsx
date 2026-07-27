import type { Metadata } from "next";
import CodeBlock from "@/src/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "Architecture Reference",
  description:
    "Deep dive into the folder structure, utilities, hooks, server actions, and conventions of the React + Next.js Engineering Boilerplate.",
};

const folders = [
  {
    name: "app/",
    icon: "📁",
    desc: "Routes, pages, layouts, and API endpoints using the Next.js App Router.",
    files: [
      "layout.tsx — Root layout with Poppins font and SEO metadata",
      "page.tsx — Home/landing page",
      "error.tsx — Route-level error boundary (client component)",
      "not-found.tsx — Custom 404 page",
      "loading.tsx — Global loading indicator",
      "styles/globals.css — Tailwind imports, design tokens, custom utilities",
    ],
    convention:
      "Each folder inside app/ becomes a route. Use layout.tsx for shared UI, page.tsx for page content, and error.tsx for error boundaries.",
  },
  {
    name: "components/",
    icon: "🧩",
    desc: "Reusable UI components organized by scope.",
    files: [
      "layout/ — Structural components (Header, Footer)",
      "shared/ — Components used across multiple features",
      "ui/ — Base/atomic UI components (buttons, inputs, cards)",
    ],
    convention:
      "Keep components small and focused. One component per file. Use TypeScript interfaces for props. Co-locate related components in sub-folders.",
  },
  {
    name: "hooks/",
    icon: "🪝",
    desc: "Custom React hooks for reusable stateful logic.",
    files: [
      "useCustomParams.ts — URL query parameter management",
      "index.ts — Re-export barrel file",
    ],
    convention:
      "Name hooks starting with 'use'. Keep hooks pure (no direct DOM manipulation). Export from index.ts for clean imports.",
  },
  {
    name: "utils/",
    icon: "🔧",
    desc: "Generic, stateless utility functions with no side effects.",
    files: [
      "queryExtractor.ts — Build URL query strings for API calls",
      "paramsExtractor.ts — Parse server-side search params (async)",
      "logger.ts — Environment-aware console logger",
    ],
    convention:
      "Utils must be pure functions. No React imports, no state, no side effects. One function per file preferred.",
  },
  {
    name: "helpers/",
    icon: "🤝",
    desc: "Pure helper functions for data transformation.",
    files: [
      "array.ts — sortBy, groupBy, uniqueArray (all type-safe with generics)",
    ],
    convention:
      "Helpers are for data manipulation (arrays, objects, strings). Keep them generic and type-safe.",
  },
  {
    name: "core/",
    icon: "⚙️",
    desc: "Application infrastructure — server actions, caching, auth.",
    files: [
      "actions/mutation.ts — Generic CRUD mutation helper with auth + cache revalidation",
      "actions/auth-actions.ts — Cookie-based logout server action",
      "cache/revalidate.ts — Cache revalidation utilities (placeholder)",
    ],
    convention:
      "Core is for infrastructure that the rest of the app depends on. Server actions go here, not in components or utils.",
  },
  {
    name: "types/",
    icon: "📐",
    desc: "Global TypeScript type definitions and constants.",
    files: [
      "queryExtractor.type.ts — QueryExtractor type definition",
      "paramsExtractor.type.ts — IPamrasEX constants (SEARCHTERM, PAGE, LIMIT)",
    ],
    convention:
      "Use 'type' suffix for type files. Export types and interfaces. Use 'as const' for runtime constants.",
  },
  {
    name: "constants/",
    icon: "📋",
    desc: "Static configuration values and API URL constants.",
    files: [
      "convention.api.constant.ts — API_BASE_URL, API_V1_BASE_URL, CLIENT_BASE_URL",
    ],
    convention:
      "Constants never change at runtime. Use UPPER_SNAKE_CASE for naming. Group by domain (api, routes, config).",
  },
  {
    name: "assets/",
    icon: "🖼️",
    desc: "Static assets like images, icons, and SVGs.",
    files: ["index.ts — Re-export barrel file"],
    convention:
      "Keep assets in public/ for static files or assets/ for importable modules. Use index.ts for clean imports.",
  },
];

const utilities = [
  {
    name: "queryExtractor",
    file: "src/utils/queryExtractor.ts",
    desc: "Builds URL query strings from search, sort, pagination, and filter parameters. Used to construct API request URLs.",
    signature: `queryExtractor({
  searchTerm?: string,
  sortBy?: string,
  sortOrder?: "asc" | "desc",
  page?: number,
  limit?: number,
  extra?: Record<string, unknown>,
}): string`,
    example: `import { queryExtractor } from "@/src/utils/queryExtractor";

const query = queryExtractor({
  searchTerm: "react",
  sortBy: "name",
  sortOrder: "asc",
  page: 1,
  limit: 10,
  extra: { category: "frontend" },
});

// Result:
// "searchTerm=react&sortBy=name&sortOrder=asc&page=1&limit=10&category=frontend"

const url = \`\${API_V1_BASE_URL}/users?\${query}\`;`,
  },
  {
    name: "paramsExtractor",
    file: "src/utils/paramsExtractor.ts",
    desc: "Parses server-side search params in Next.js App Router. Returns typed searchTerm, page, limit, and filter values.",
    signature: `paramsExtractor({
  searchParam: Promise<Record<string, string | string[]>> | undefined,
}): Promise<{
  searchTerm: string,
  page: number,
  limit: number,
  filter: Record<string, string>,
}>`,
    example: `import { paramsExtractor } from "@/src/utils/paramsExtractor";

// In a Server Component
export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const { searchTerm, page, limit, filter } = await paramsExtractor({
    searchParam: searchParams,
  });

  // Use these values to fetch data
}`,
  },
  {
    name: "logger",
    file: "src/utils/logger.ts",
    desc: "Environment-aware console logger. Logs full details in development, sanitized messages in production.",
    signature: `logger(error: Error | any): void`,
    example: `import { logger } from "@/src/utils/logger";

try {
  // risky operation
} catch (error) {
  logger(error);
  // Development: logs full error
  // Production: logs "Internal server error!"
}`,
  },
  {
    name: "array helpers",
    file: "src/helpers/array.ts",
    desc: "Type-safe array utility functions: sortBy, groupBy, and uniqueArray. All use TypeScript generics.",
    signature: `sortBy<T>(arr: T[], key: keyof T, order?: "asc" | "desc"): T[]
groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>
uniqueArray<T>(arr: T[], key?: keyof T): T[]`,
    example: `import { sortBy, groupBy, uniqueArray } from "@/src/helpers/array";

// Sort users by name ascending
const sorted = sortBy(users, "name", "asc");

// Group orders by status
const grouped = groupBy(orders, "status");
// { pending: [...], completed: [...] }

// Remove duplicates by id
const unique = uniqueArray(items, "id");`,
  },
];

const hooks = [
  {
    name: "useCustomParams",
    file: "src/hooks/useCustomParams.ts",
    desc: "Client-side hook for managing URL query parameters. Provides read, write, and clear operations with debounce support and non-blocking transitions.",
    returns: [
      { name: "setQueryParam", desc: "Set or update URL query parameters" },
      { name: "removeQueryParam", desc: "Remove specific query parameters" },
      { name: "clearAllQueryParam", desc: "Remove all query parameters" },
      { name: "getQueryParam", desc: "Read a single query parameter value" },
      {
        name: "getArrayQueryParam",
        desc: "Read a comma-separated param as array",
      },
      { name: "getNumberParam", desc: "Read a param as number with fallback" },
      {
        name: "getBooleanParam",
        desc: "Read a param as boolean with fallback",
      },
      {
        name: "allParams",
        desc: "Object containing all current query params",
      },
      {
        name: "loading",
        desc: "Boolean indicating if a transition is pending",
      },
    ],
    example: `"use client";
import { useCustomParams } from "@/src/hooks/useCustomParams";

export default function Filters() {
  const {
    setQueryParam,
    removeQueryParam,
    clearAllQueryParam,
    getQueryParam,
    loading,
  } = useCustomParams({ routeName: "products" });

  return (
    <div>
      {/* Search */}
      <input
        onChange={(e) =>
          setQueryParam({ search: e.target.value }, { debounce: true })
        }
        defaultValue={getQueryParam("search") ?? ""}
      />

      {/* Page */}
      <button onClick={() => setQueryParam({ page: "2" })}>
        Page 2
      </button>

      {/* Remove */}
      <button onClick={() => removeQueryParam("search")}>
        Clear Search
      </button>

      {/* Clear all */}
      <button onClick={clearAllQueryParam}>Reset All</button>

      {loading && <p>Updating...</p>}
    </div>
  );
}`,
  },
];

const serverActions = [
  {
    name: "mutation",
    file: "src/core/actions/mutation.ts",
    desc: "Generic server action for CRUD operations. Handles authentication (cookie-based Bearer token), optional shop identification, cache revalidation (paths + tags), and error handling.",
    params: [
      {
        name: "route",
        type: "string",
        desc: "API route path (e.g., '/users')",
      },
      {
        name: "method",
        type: '"POST" | "PUT" | "PATCH" | "DELETE"',
        desc: "HTTP method",
      },
      { name: "data", type: "string", desc: "JSON stringified request body" },
      {
        name: "id",
        type: "string",
        desc: "Resource ID (for DELETE with single item)",
      },
      {
        name: "ids",
        type: "string[]",
        desc: "Resource IDs (for bulk DELETE)",
      },
      {
        name: "requireAuth",
        type: "boolean",
        desc: "Require authentication (default: true)",
      },
      {
        name: "requireShopId",
        type: "boolean",
        desc: "Require shop identifier (default: false)",
      },
      {
        name: "pathToRevalidate",
        type: "string | string[]",
        desc: "Paths to revalidate after mutation",
      },
      {
        name: "tagsToRevalidate",
        type: "string | string[]",
        desc: "Cache tags to revalidate after mutation",
      },
    ],
    example: `import { mutation } from "@/src/core/actions/mutation";

// Create a new user
const newUser = await mutation({
  route: "/users",
  method: "POST",
  data: JSON.stringify({ name: "John", email: "john@example.com" }),
  pathToRevalidate: "/users",
});

// Update a user
const updated = await mutation({
  route: "/users",
  method: "PATCH",
  id: "123",
  data: JSON.stringify({ name: "Jane" }),
  pathToRevalidate: "/users",
});

// Delete a user
const deleted = await mutation({
  route: "/users",
  method: "DELETE",
  id: "123",
  pathToRevalidate: "/users",
});

// Bulk delete
const bulkDeleted = await mutation({
  route: "/users",
  method: "DELETE",
  ids: ["123", "456", "789"],
  pathToRevalidate: "/users",
});`,
  },
  {
    name: "logoutServerAction",
    file: "src/core/actions/auth-actions.ts",
    desc: "Server action that clears the authentication cookie and redirects to /login.",
    example: `import { logoutServerAction } from "@/src/core/actions/auth-actions";

// In a component or layout
<button onClick={() => logoutServerAction()}>
  Logout
</button>`,
  },
];

const commitTypes = [
  { type: "feat", desc: "A new feature" },
  { type: "fix", desc: "A bug fix" },
  { type: "ui", desc: "UI or styling changes" },
  { type: "update", desc: "Update any code block" },
  { type: "refactor", desc: "Code refactoring without changing behavior" },
  { type: "perf", desc: "Performance improvements" },
  { type: "docs", desc: "Documentation updates" },
  { type: "test", desc: "Adding or updating tests" },
  { type: "chore", desc: "Maintenance tasks (configs, deps, tooling)" },
  { type: "build", desc: "Build system or bundler changes" },
  { type: "ci", desc: "CI/CD related changes" },
  { type: "revert", desc: "Reverting a previous commit" },
];

export default function ArchitecturePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-main">
          Reference
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
          Architecture
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
          Deep dive into the folder structure, utilities, hooks, server actions,
          and conventions that power this boilerplate.
        </p>
      </section>

      {/* Folder Structure */}
      <section id="structure" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Folder Structure</h2>
          <p className="text-white/50 mt-2">
            Each folder has a clear responsibility. Follow these conventions
            when adding new code.
          </p>
        </div>

        <div className="space-y-4">
          {folders.map((folder) => (
            <details
              key={folder.name}
              className="border border-white/10 rounded-xl overflow-hidden group"
            >
              <summary className="flex items-center gap-3 px-6 py-4 cursor-pointer select-none hover:bg-white/5 transition-colors">
                <span className="text-lg">{folder.icon}</span>
                <div className="flex-1">
                  <code className="text-sm font-mono text-main font-semibold">
                    {folder.name}
                  </code>
                  <p className="text-sm text-white/50 mt-0.5">{folder.desc}</p>
                </div>
                <svg
                  className="w-4 h-4 text-white/30 shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-5 space-y-4 border-t border-white/10 pt-4">
                <ul className="space-y-2">
                  {folder.files.map((file) => (
                    <li
                      key={file}
                      className="flex items-start gap-2 text-sm text-white/60"
                    >
                      <span className="text-main/40 mt-1">&#8226;</span>
                      <span>
                        {file.split(" — ")[0]}{" "}
                        {file.includes(" — ") && (
                          <span className="text-white/40">
                            — {file.split(" — ")[1]}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="bg-main/5 rounded-lg px-4 py-3 border border-main/10">
                  <p className="text-xs text-main/60 uppercase tracking-wider mb-1">
                    Convention
                  </p>
                  <p className="text-sm text-white/60">{folder.convention}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Utilities */}
      <section id="utilities" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Key Utilities</h2>
          <p className="text-white/50 mt-2">
            Core utility functions for data handling and API interactions.
          </p>
        </div>

        <div className="space-y-6">
          {utilities.map((util) => (
            <div
              key={util.name}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono text-main font-semibold">
                    {util.name}
                  </code>
                  <span className="text-xs text-white/40 font-mono">
                    {util.file}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-2">{util.desc}</p>
              </div>
              <div className="px-6 py-4 space-y-4 border-b border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Signature
                </p>
                <CodeBlock code={util.signature} language="typescript" />
              </div>
              <div className="px-6 py-4 space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Usage Example
                </p>
                <CodeBlock code={util.example} language="typescript" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Server Actions */}
      <section id="server-actions" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Server Actions</h2>
          <p className="text-white/50 mt-2">
            Pre-built server-side functions for mutations and authentication.
          </p>
        </div>

        <div className="space-y-6">
          {serverActions.map((action) => (
            <div
              key={action.name}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono text-main font-semibold">
                    {action.name}
                  </code>
                  <span className="text-xs text-white/40 font-mono">
                    {action.file}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-2">{action.desc}</p>
              </div>

              {action.params && (
                <div className="px-6 py-4 border-b border-white/10">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                    Parameters
                  </p>
                  <div className="space-y-2">
                    {action.params.map((param) => (
                      <div
                        key={param.name}
                        className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm"
                      >
                        <code className="text-white/70 font-mono shrink-0">
                          {param.name}
                        </code>
                        <span className="text-xs text-main/60 font-mono shrink-0">
                          {param.type}
                        </span>
                        <span className="text-white/50 sm:ml-auto">
                          {param.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="px-6 py-4 space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Usage Example
                </p>
                <CodeBlock code={action.example} language="typescript" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hooks */}
      <section id="hooks" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Custom Hooks</h2>
          <p className="text-white/50 mt-2">
            Reusable stateful logic for client-side data management.
          </p>
        </div>

        <div className="space-y-6">
          {hooks.map((hook) => (
            <div
              key={hook.name}
              className="border border-white/10 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono text-main font-semibold">
                    {hook.name}
                  </code>
                  <span className="text-xs text-white/40 font-mono">
                    {hook.file}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-2">{hook.desc}</p>
              </div>

              <div className="px-6 py-4 border-b border-white/10">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                  Returns
                </p>
                <div className="space-y-2">
                  {hook.returns.map((ret) => (
                    <div
                      key={ret.name}
                      className="flex items-center gap-3 text-sm"
                    >
                      <code className="text-main font-mono shrink-0">
                        {ret.name}
                      </code>
                      <span className="text-white/50">{ret.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 space-y-3">
                <p className="text-xs text-white/40 uppercase tracking-wider">
                  Usage Example
                </p>
                <CodeBlock code={hook.example} language="tsx" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Styling */}
      <section id="styling" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Styling System</h2>
          <p className="text-white/50 mt-2">
            Tailwind CSS v4 with custom design tokens and utility classes.
          </p>
        </div>

        <div className="space-y-6">
          {/* Design Tokens */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-semibold text-white">Design Tokens</h3>
              <p className="text-sm text-white/50 mt-1">
                CSS variables defined in <code>:root</code> and mapped to
                Tailwind via <code>@theme inline</code>.
              </p>
            </div>
            <div className="divide-y divide-white/5">
              <TokenRow
                name="--main-color"
                value="#ccfd3f"
                desc="Brand accent (lime green)"
              />
              <TokenRow
                name="--brand"
                value="147 51 234"
                desc="Primary brand (purple, RGB)"
              />
              <TokenRow
                name="--brand-2"
                value="59 130 246"
                desc="Secondary brand (blue, RGB)"
              />
              <TokenRow
                name="--success"
                value="#22c55e"
                desc="Success state (green)"
              />
              <TokenRow
                name="--warning"
                value="#f59e0b"
                desc="Warning state (amber)"
              />
              <TokenRow
                name="--danger"
                value="#ef4444"
                desc="Danger state (red)"
              />
            </div>
          </div>

          {/* Custom Utilities */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="font-semibold text-white">
                Custom Utility Classes
              </h3>
            </div>
            <div className="divide-y divide-white/5">
              <TokenRow
                name=".gradient-bg"
                value="animated"
                desc="Animated gradient from brand to brand-2"
              />
              <TokenRow
                name=".glass-card"
                value="blur"
                desc="Glassmorphism effect with backdrop blur"
              />
              <TokenRow
                name=".grid-overlay"
                value="pattern"
                desc="Subtle 40px grid pattern overlay"
              />
              <TokenRow
                name=".glow"
                value="shadow"
                desc="Animated purple glow box-shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commit Convention */}
      <section id="commits" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Commit Convention</h2>
          <p className="text-white/50 mt-2">
            Standardized commit messages for readable Git history.
          </p>
        </div>

        <div className="border border-white/10 rounded-xl p-6 space-y-4">
          <p className="text-sm text-white/60">
            Format:{" "}
            <code className="text-main font-mono">
              &lt;type&gt;: &lt;description&gt;
            </code>
          </p>
          <CodeBlock
            code={`feat: add hero section call-to-action\nfix: resolve mobile navbar overflow\nui: adjust button spacing on mobile\ndocs: update readme with setup steps`}
            language="bash"
            label="Examples"
          />
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Commit Types</h3>
          </div>
          <div className="divide-y divide-white/5">
            {commitTypes.map((ct) => (
              <div
                key={ct.type}
                className="flex items-center gap-4 px-6 py-3"
              >
                <code className="text-sm font-mono text-main shrink-0">
                  {ct.type}
                </code>
                <span className="text-sm text-white/50">{ct.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-white/10 rounded-xl p-6">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">
            Rules
          </p>
          <ul className="space-y-2 text-sm text-white/60">
            <li className="flex items-start gap-2">
              <span className="text-main/40 mt-1">&#8226;</span>
              Use present tense (&quot;add&quot;, not &quot;added&quot;)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main/40 mt-1">&#8226;</span>
              Do not capitalize the first letter
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main/40 mt-1">&#8226;</span>
              Do not end with a period
            </li>
            <li className="flex items-start gap-2">
              <span className="text-main/40 mt-1">&#8226;</span>
              One logical change per commit
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function TokenRow({
  name,
  value,
  desc,
}: {
  name: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-3">
      <code className="text-sm font-mono text-white/70 shrink-0">{name}</code>
      <code className="text-xs font-mono text-main shrink-0">{value}</code>
      <span className="text-sm text-white/50 sm:ml-auto">{desc}</span>
    </div>
  );
}
