import Link from "next/link";

const features = [
  {
    title: "Scalable Architecture",
    desc: "Clean folder structure with modular boundaries for long-term growth.",
  },
  {
    title: "Type-Safe by Default",
    desc: "Strict TypeScript configuration with end-to-end type coverage.",
  },
  {
    title: "Modern Frontend Patterns",
    desc: "Hooks, server components, reusable abstractions, and optimized rendering.",
  },
  {
    title: "Built-in Code Quality",
    desc: "ESLint, Prettier, strict lint rules, and production-ready configuration.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 grid-overlay"></div>

      <div className="absolute -top-40 -right-40 w-100 h-100 rounded-full glow opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Engineering-Grade <br />
            <span className="bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
              React + Next.js Boilerplate
            </span>
          </h1>

          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            A scalable, type-safe, production-ready foundation for building
            modern web applications with confidence.
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/docs"
              className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Get Started
            </Link>
            <Link
              href="/docs/architecture"
              className="px-6 py-3 border border-white/40 rounded-xl hover:bg-white/10 transition"
            >
              View Documentation
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-300">
            Designed for serious development. Optimized for performance.
            Structured for scale.
          </p>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="glass-card rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold tracking-wide">JAKER HOSSAIN</h3>

            <p className="mt-3 text-gray-300 text-sm leading-relaxed">
              Frontend Engineer at{" "}
              <span className="font-semibold text-white underline">
                Expert Squad
              </span>
            </p>

            <p className="text-gray-300 text-sm">Username: @jackfd120</p>

            <div className="mt-6 text-xs uppercase tracking-widest text-white/50">
              Author & Maintainer of This Boilerplate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
