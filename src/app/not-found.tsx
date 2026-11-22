import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-black text-[#1769AA]">404</h1>
      <h2 className="text-2xl font-bold text-[#0B1220] mt-3">Page Not Found</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-xl bg-[#1769AA] text-white font-bold text-sm hover:bg-[#0D4F85] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
