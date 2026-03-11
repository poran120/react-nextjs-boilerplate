import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
      {/* background layers */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute inset-0 grid-overlay"></div>

      <div className="absolute -top-40 -right-40 w-100 h-100 rounded-full glow opacity-40"></div>

      {/* content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-semibold">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-300 max-w-md mx-auto text-sm">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition"
          >
            Go Home
          </Link>

          <Link
            href="/docs"
            className="px-6 py-3 border border-white/40 rounded-xl hover:bg-white/10 transition"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  );
}
