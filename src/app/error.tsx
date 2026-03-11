"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
          {/* background layers */}
          <div className="absolute inset-0 gradient-bg"></div>
          <div className="absolute inset-0 grid-overlay"></div>

          <div className="absolute -top-40 -right-40 w-100 h-100 rounded-full glow opacity-40"></div>

          {/* content */}
          <div className="relative z-10 text-center px-6 max-w-xl">
            <p className="text-xs uppercase tracking-widest text-white/50">
              Application Error
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              Something went wrong
            </h1>

            <p className="mt-3 text-gray-300 text-sm">
              An unexpected error occurred while processing your request. Please
              try again.
            </p>

            {/* optional error message (dev only) */}
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-6 text-xs text-red-200 bg-black/40 p-4 rounded-lg overflow-auto">
                {error.message}
              </pre>
            )}

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => reset()}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition"
              >
                Try Again
              </button>
            </div>

            <p className="text-xs text-white/40 mt-10">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
