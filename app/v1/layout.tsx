import Link from 'next/link';

export default function V1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full bg-[#1C1C1C] text-[#F0ECE3] text-sm font-sans">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <span className="opacity-90">
            <span className="font-mono text-[#D97706]">v1</span> · archived edition of shahzaibbuilds.me
          </span>
          <Link
            href="/"
            className="underline underline-offset-4 decoration-[#D97706]/60 hover:decoration-[#D97706] hover:text-white transition-colors"
          >
            visit the current site →
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
