import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2">Page not found</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-black text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
