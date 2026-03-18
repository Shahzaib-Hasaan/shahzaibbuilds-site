export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAF5] flex items-center justify-center relative overflow-hidden">
      {/* Subtle grain overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Warm amber glow — top right */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-accent/[0.06] rounded-full blur-[120px]" />
      {/* Teal glow — bottom left */}
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-teal-accent/[0.05] rounded-full blur-[120px]" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Logo mark */}
        <div className="mb-10 flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-accent to-amber-hover flex items-center justify-center shadow-lg shadow-amber-accent/20">
            <span className="text-white font-mono font-bold text-xl tracking-tight">S</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-ink tracking-tight leading-[1.1] mb-6">
          Something new
          <br />
          <span className="text-amber-accent">is brewing.</span>
        </h1>

        {/* Subtext */}
        <p className="text-ink-muted text-lg sm:text-xl font-sans leading-relaxed max-w-md mx-auto mb-12">
          Shahzaib Builds is getting a fresh look.
          <br className="hidden sm:block" />
          We&apos;ll be back shortly.
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-px bg-warm-border-dark" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-accent" />
          <div className="w-12 h-px bg-warm-border-dark" />
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="https://x.com/shahzaib_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-ink-muted hover:text-amber-accent transition-colors duration-300"
            aria-label="X (Twitter)"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/shahzaib_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-ink-muted hover:text-amber-accent transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            href="https://github.com/Shahzaib-Hasaan"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-ink-muted hover:text-amber-accent transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://tiktok.com/@shahzaib_builds"
            target="_blank"
            rel="noopener noreferrer"
            className="group text-ink-muted hover:text-amber-accent transition-colors duration-300"
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z" />
            </svg>
          </a>
        </div>

        {/* Email */}
        <p className="mt-8 text-sm text-ink-light font-mono tracking-wide">
          contact@shahzaibbuilds.me
        </p>
      </div>
    </main>
  );
}
