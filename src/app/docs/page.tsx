import type { Metadata } from "next";
import CodeBlock from "@/src/components/docs/CodeBlock";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Download, install, and set up the React + Next.js Engineering Boilerplate in minutes.",
};

const REPO_URL = "https://github.com/poran120/react-nextjs-boilerplate";

const downloadOptions = [
  {
    title: "Clone via HTTPS",
    description: "Best for most users. Requires Git installed.",
    command: `git clone ${REPO_URL}.git`,
  },
  {
    title: "Clone via SSH",
    description: "For users with SSH keys configured on GitHub.",
    command: `git clone git@github.com:poran120/react-nextjs-boilerplate.git`,
  },
  {
    title: "Download ZIP",
    description: "No Git required. Downloads a compressed archive.",
    url: `${REPO_URL}/archive/refs/heads/main.zip`,
  },
];

const scripts = [
  { cmd: "npm run dev", desc: "Start development server with Turbopack" },
  { cmd: "npm run build", desc: "Create an optimized production build" },
  { cmd: "npm run start", desc: "Start the production server" },
  { cmd: "npm run lint", desc: "Run ESLint to check for code issues" },
];

export default function GetStartedPage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-main">
          Documentation
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
          Get Started
        </h1>
        <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
          Everything you need to download, configure, and start building with
          this production-ready Next.js boilerplate.
        </p>
      </section>

      {/* Download Options */}
      <section id="download" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Download the Boilerplate
          </h2>
          <p className="text-white/50 mt-2">
            Choose your preferred method to get the code.
          </p>
        </div>

        <div className="grid gap-4">
          {downloadOptions.map((opt) => (
            <div
              key={opt.title}
              className="border border-white/10 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{opt.title}</h3>
                  <p className="text-sm text-white/50 mt-0.5">
                    {opt.description}
                  </p>
                </div>
                {opt.url ? (
                  <a
                    href={opt.url}
                    download
                    className="shrink-0 ml-4 px-4 py-2 bg-main text-black text-sm font-semibold rounded-lg hover:bg-main/80 transition-colors"
                  >
                    Download
                  </a>
                ) : null}
              </div>
              {opt.command && (
                <CodeBlock code={opt.command} language="bash" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Installation</h2>
          <p className="text-white/50 mt-2">
            Step-by-step guide to get the project running locally.
          </p>
        </div>

        <div className="space-y-8">
          <Step number={1} title="Navigate to the project">
            <CodeBlock code="cd react-nextjs-boilerplate" language="bash" />
          </Step>

          <Step number={2} title="Install dependencies">
            <p className="text-white/50 text-sm mb-3">
              Choose your preferred package manager:
            </p>
            <div className="space-y-3">
              <CodeBlock code="npm install" language="bash" label="npm" />
              <CodeBlock code="yarn install" language="bash" label="yarn" />
              <CodeBlock code="pnpm install" language="bash" label="pnpm" />
            </div>
          </Step>

          <Step number={3} title="Start the development server">
            <CodeBlock code="npm run dev" language="bash" />
            <p className="text-white/50 text-sm mt-3">
              The app will be available at{" "}
              <span className="text-main font-mono">
                http://localhost:3000
              </span>
            </p>
          </Step>
        </div>
      </section>

      {/* Environment Setup */}
      <section id="environment" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Environment Setup
          </h2>
          <p className="text-white/50 mt-2">
            Configure environment variables for your project.
          </p>
        </div>

        <div className="border border-white/10 rounded-xl p-6 space-y-4">
          <p className="text-white/60 text-sm">
            Create a{" "}
            <code className="text-main font-mono">.env.local</code> file in the
            project root:
          </p>
          <CodeBlock
            code={`# Backend API\nNEXT_PUBLIC_API_BASE_URL=http://localhost:8000\n\n# Client URL\nNEXT_PUBLIC_CLIENT_BASE_URL=http://localhost:3000`}
            language="bash"
            label=".env.local"
          />
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="px-6 py-3 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">
              Environment Variables
            </h3>
          </div>
          <div className="divide-y divide-white/5">
            <EnvRow
              name="NEXT_PUBLIC_API_BASE_URL"
              required
              desc="Backend API base URL used by server actions"
            />
            <EnvRow
              name="NEXT_PUBLIC_CLIENT_BASE_URL"
              required
              desc="Client-facing base URL for redirects and links"
            />
            <EnvRow
              name="NODE_ENV"
              required={false}
              desc="Automatically set by Next.js (development / production)"
            />
          </div>
        </div>
      </section>

      {/* Scripts */}
      <section id="scripts" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Available Scripts</h2>
          <p className="text-white/50 mt-2">
            Built-in scripts for development, building, and linting.
          </p>
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {scripts.map((s) => (
              <div
                key={s.cmd}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-6 py-4"
              >
                <code className="text-sm font-mono text-main shrink-0">
                  {s.cmd}
                </code>
                <span className="text-sm text-white/50">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section id="deployment" className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Deployment</h2>
          <p className="text-white/50 mt-2">
            Deploy your application to production.
          </p>
        </div>

        <div className="space-y-6">
          {/* Vercel */}
          <div className="border border-white/10 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-main flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-black"
                  viewBox="0 0 76 65"
                  fill="currentColor"
                >
                  <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  Vercel (Recommended)
                </h3>
                <p className="text-sm text-white/50">
                  Zero-config deployment optimized for Next.js.
                </p>
              </div>
            </div>
            <ol className="space-y-2 text-sm text-white/60 list-decimal list-inside">
              <li>Push your code to GitHub</li>
              <li>
                Import the repository on{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main underline hover:text-main/80 transition"
                >
                  vercel.com
                </a>
              </li>
              <li>Vercel auto-detects Next.js and configures the build</li>
              <li>Set environment variables in the Vercel dashboard</li>
              <li>Deploy</li>
            </ol>
          </div>

          {/* Manual */}
          <div className="border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Manual Deployment</h3>
            <p className="text-sm text-white/50">
              For custom hosting providers or self-hosted servers.
            </p>
            <CodeBlock
              code={`npm run build\nnpm run start`}
              language="bash"
            />
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="space-y-6">
        <div className="border border-main/30 rounded-xl p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Next Steps</h2>
          <p className="text-white/50 max-w-lg mx-auto">
            Now that your project is running, explore the architecture to
            understand the folder structure, utilities, and conventions.
          </p>
          <a
            href="/docs/architecture"
            className="inline-block px-6 py-3 bg-main text-black font-semibold rounded-xl hover:bg-main/80 transition"
          >
            Explore Architecture &rarr;
          </a>
        </div>
      </section>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-main/10 text-main flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <div className="flex-1 space-y-3 pt-0.5">
        <h3 className="font-semibold text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function EnvRow({
  name,
  required,
  desc,
}: {
  name: string;
  required: boolean;
  desc: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-6 py-4">
      <code className="text-sm font-mono text-main shrink-0">{name}</code>
      <span className="text-xs text-white/40 shrink-0">
        {required ? "Required" : "Optional"}
      </span>
      <span className="text-sm text-white/50 sm:ml-auto">{desc}</span>
    </div>
  );
}
