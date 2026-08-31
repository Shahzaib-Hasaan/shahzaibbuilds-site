'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

const REPO = 'Shahzaib-Hasaan/ytdm';
const RELEASES = `https://github.com/${REPO}/releases`;

type Assets = {
  version: string;
  exe?: string;
  appimage?: string;
  rpm?: string;
  deb?: string;
};

type OS = 'windows' | 'linux' | 'mac' | 'other';

function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'other';
  const p = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (p.includes('win')) return 'windows';
  if (p.includes('linux') || p.includes('x11')) return 'linux';
  if (p.includes('mac')) return 'mac';
  return 'other';
}

const FEATURES: { title: string; body: string }[] = [
  {
    title: 'Download queue',
    body: 'Queue dozens of videos with pause, resume, retry, and automatic crash recovery — interrupted downloads pick up where they left off.',
  },
  {
    title: 'Full playlists',
    body: 'Paste a playlist link, tick the videos you want, and they download into their own folder — no clutter.',
  },
  {
    title: 'Quality presets',
    body: 'Best MP4 for compatibility, best-available quality, 1080p, 720p, or audio-only M4A/MP3.',
  },
  {
    title: 'Subtitles included',
    body: 'Saves .srt subtitle files next to each video, fetched carefully so large batches don’t trip rate limits.',
  },
  {
    title: 'Live progress',
    body: 'Per-download speed graphs, ETA, and phase indicators (video, audio, processing) — a proper download manager, not a spinner.',
  },
  {
    title: 'Clipboard watcher',
    body: 'Copy a YouTube link anywhere and YTDM offers to download it. One keystroke from link to queue.',
  },
  {
    title: 'Speed control',
    body: 'A global bandwidth cap shared across downloads keeps YTDM from eating your connection.',
  },
  {
    title: 'Self-updating engine',
    body: 'The download engine (yt-dlp) updates itself independently of the app, so YTDM keeps working when YouTube changes things.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Windows says "Windows protected your PC" — is this safe?',
    a: 'Yes. New open-source apps without a paid signing certificate trigger SmartScreen until they build reputation. Click "More info", then "Run anyway". The full source code is public on GitHub if you want to audit or build it yourself.',
  },
  {
    q: 'Is YTDM really free?',
    a: 'Completely. MIT-licensed, open source, no ads, no accounts, no telemetry. It talks only to YouTube (for your downloads) and GitHub (for updates).',
  },
  {
    q: 'Why does the first launch download extra components?',
    a: 'YTDM fetches its open-source engine (yt-dlp, FFmpeg, Deno) on first run (~60 MB) instead of bundling it. That keeps the installer lean and lets the engine update itself the moment YouTube changes something — no waiting for a new app release.',
  },
  {
    q: 'Where do my downloads go?',
    a: 'Your Downloads folder by default; playlists get their own subfolder. You can change the location in Settings.',
  },
  {
    q: 'Does it update itself?',
    a: 'On Windows and with the Linux AppImage, yes — the app checks GitHub Releases, downloads updates in the background, and applies them on restart. The rpm/deb installs update through your package manager.',
  },
  {
    q: 'Is downloading from YouTube allowed?',
    a: 'Downloading may violate YouTube’s Terms of Service. Use YTDM only for your own content, Creative Commons material, or content you otherwise have the right to save. You are responsible for how you use it.',
  },
];

export default function YtdmProduct() {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [os, setOs] = useState<OS>('other');

  useEffect(() => {
    setOs(detectOS());
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
      .then((r) => (r.ok ? r.json() : null))
      .then((rel) => {
        if (!rel?.assets) return;
        const find = (suffix: string) =>
          rel.assets.find((a: { name: string }) => a.name.toLowerCase().endsWith(suffix))
            ?.browser_download_url;
        setAssets({
          version: String(rel.tag_name ?? '').replace(/^v/, ''),
          exe: find('.exe'),
          appimage: find('.appimage'),
          rpm: find('.rpm'),
          deb: find('.deb'),
        });
      })
      .catch(() => {});
  }, []);

  const primary = useMemo(() => {
    if (os === 'windows')
      return { label: 'Download for Windows', href: assets?.exe ?? `${RELEASES}/latest` };
    if (os === 'linux')
      return { label: 'Download for Linux', href: assets?.appimage ?? `${RELEASES}/latest` };
    return { label: 'Download YTDM', href: `${RELEASES}/latest` };
  }, [os, assets]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 text-center md:pt-36">
          <Image
            src="/ytdm/icon.png"
            alt="YTDM logo"
            width={88}
            height={88}
            className="mx-auto mb-6 rounded-2xl shadow-lg"
            priority
          />
          <h1 className="[font-family:var(--font-instrument)] text-5xl font-semibold tracking-tight md:text-6xl">
            YT<span className="text-[#e5484d]">DM</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[color:var(--text-muted)]">
            A fast, modern download manager for YouTube. Queue, playlists, subtitles,
            pause &amp; resume — free and open source.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={primary.href}
              className="inline-flex items-center gap-2 rounded-lg bg-[#e5484d] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#f2555a]"
            >
              <svg width="16" height="16" viewBox="0 0 256 256" aria-hidden="true">
                <path
                  d="M110 54h36a8 8 0 0 1 8 8v58h28a8 8 0 0 1 6 13.3l-54 62a8 8 0 0 1-12.2 0l-54-62a8 8 0 0 1 6-13.3h28V62a8 8 0 0 1 8-8z"
                  fill="currentColor"
                />
                <rect x="58" y="204" width="140" height="18" rx="9" fill="currentColor" opacity="0.85" />
              </svg>
              {primary.label}
            </a>
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border-strong)] px-6 py-3 text-sm font-medium text-[color:var(--text)] transition hover:bg-[color:var(--bg-alt)]"
            >
              All platforms &amp; formats
            </a>
          </div>

          <p className="mt-4 font-mono text-xs text-[color:var(--text-faint)]">
            {assets ? `v${assets.version}` : 'Latest release'} · Windows &amp; Linux · MIT
            license ·{' '}
            <a
              href={`https://github.com/${REPO}`}
              className="underline decoration-[color:var(--border-strong)] underline-offset-4 hover:text-[color:var(--text-muted)]"
              target="_blank"
              rel="noreferrer"
            >
              Source on GitHub
            </a>
          </p>
        </div>
      </section>

      {/* ---------- Screenshot ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-xl border border-[color:var(--border)] shadow-2xl">
          <Image
            src="/ytdm/screenshot.png"
            alt="YTDM downloading a 40-video playlist with live per-video progress"
            width={1920}
            height={1022}
            className="w-full"
          />
        </div>
        <p className="mt-3 text-center text-sm text-[color:var(--text-faint)]">
          A 40-video playlist downloading on Windows — live speed graphs, ETA, and one-click
          pause per video.
        </p>
      </section>

      {/* ---------- Features ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="[font-family:var(--font-instrument)] text-3xl font-semibold">
          Everything a download manager should do
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-5"
            >
              <h3 className="text-sm font-semibold text-[color:var(--text)]">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Downloads ---------- */}
      <section id="downloads" className="border-y border-[color:var(--border)] bg-[color:var(--bg-alt)]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="[font-family:var(--font-instrument)] text-3xl font-semibold">
            Download &amp; install
          </h2>
          <p className="mt-2 text-sm text-[color:var(--text-muted)]">
            {assets ? `Latest version: v${assets.version}. ` : ''}
            All builds are produced automatically from{' '}
            <a
              href={`https://github.com/${REPO}`}
              className="underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              the public source
            </a>{' '}
            by GitHub Actions.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Windows */}
            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
              <h3 className="text-lg font-semibold">Windows 10 / 11</h3>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--text-muted)]">
                <li>
                  <a
                    href={assets?.exe ?? `${RELEASES}/latest`}
                    className="font-medium text-[color:var(--text)] underline underline-offset-4"
                  >
                    Download the installer (.exe)
                  </a>{' '}
                  and run it.
                </li>
                <li>
                  If SmartScreen appears (&quot;Windows protected your PC&quot;), click{' '}
                  <span className="font-mono text-xs">More info → Run anyway</span>. This is
                  normal for new unsigned open-source apps — see the FAQ below.
                </li>
                <li>
                  On first launch YTDM sets up its download engine (~60&nbsp;MB, one time),
                  then you&apos;re ready: paste a link, pick a quality, download.
                </li>
              </ol>
              <p className="mt-4 text-xs text-[color:var(--text-faint)]">
                Updates install themselves. Upgrading over an existing install keeps your
                queue and settings. Uninstall anytime from Apps &amp; Features.
              </p>
            </div>

            {/* Linux */}
            <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
              <h3 className="text-lg font-semibold">Linux</h3>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[color:var(--text-muted)]">
                <div>
                  <p className="font-medium text-[color:var(--text)]">
                    Fedora / RHEL —{' '}
                    <a
                      href={assets?.rpm ?? `${RELEASES}/latest`}
                      className="underline underline-offset-4"
                    >
                      .rpm
                    </a>
                  </p>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-[color:var(--bg)] p-3 font-mono text-xs">
                    sudo dnf install ./ytdm-*.x86_64.rpm
                  </pre>
                </div>
                <div>
                  <p className="font-medium text-[color:var(--text)]">
                    Ubuntu / Debian —{' '}
                    <a
                      href={assets?.deb ?? `${RELEASES}/latest`}
                      className="underline underline-offset-4"
                    >
                      .deb
                    </a>
                  </p>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-[color:var(--bg)] p-3 font-mono text-xs">
                    sudo apt install ./ytdm_*_amd64.deb
                  </pre>
                </div>
                <div>
                  <p className="font-medium text-[color:var(--text)]">
                    Any distro —{' '}
                    <a
                      href={assets?.appimage ?? `${RELEASES}/latest`}
                      className="underline underline-offset-4"
                    >
                      AppImage
                    </a>{' '}
                    <span className="text-xs text-[color:var(--text-faint)]">
                      (self-updating)
                    </span>
                  </p>
                  <pre className="mt-1 overflow-x-auto rounded-lg bg-[color:var(--bg)] p-3 font-mono text-xs">
                    {`chmod +x YTDM-*.AppImage && ./YTDM-*.AppImage
# needs FUSE: sudo dnf install fuse-libs   (Fedora)
#             sudo apt install libfuse2    (Ubuntu)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-[color:var(--text-faint)]">
            macOS isn&apos;t supported yet — if you want it,{' '}
            <a
              href={`https://github.com/${REPO}/issues`}
              className="underline underline-offset-4"
              target="_blank"
              rel="noreferrer"
            >
              open an issue
            </a>{' '}
            so I can gauge demand. A <span className="font-mono text-xs">winget</span>{' '}
            package for Windows is under review.
          </p>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="[font-family:var(--font-instrument)] text-3xl font-semibold">
          Questions people ask
        </h2>
        <div className="mt-8 divide-y divide-[color:var(--border)]">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-[color:var(--text)] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="ml-4 text-[color:var(--text-faint)] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------- Credits / bottom CTA ---------- */}
      <section className="border-t border-[color:var(--border)]">
        <div className="mx-auto max-w-6xl px-6 py-14 text-center">
          <p className="text-sm text-[color:var(--text-muted)]">
            YTDM stands on excellent open source:{' '}
            <a href="https://github.com/yt-dlp/yt-dlp" className="underline underline-offset-4" target="_blank" rel="noreferrer">
              yt-dlp
            </a>
            ,{' '}
            <a href="https://ffmpeg.org" className="underline underline-offset-4" target="_blank" rel="noreferrer">
              FFmpeg
            </a>
            ,{' '}
            <a href="https://deno.com" className="underline underline-offset-4" target="_blank" rel="noreferrer">
              Deno
            </a>{' '}
            and Electron.
          </p>
          <a
            href={primary.href}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#e5484d] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#f2555a]"
          >
            {primary.label}
          </a>
          <p className="mt-3 font-mono text-xs text-[color:var(--text-faint)]">
            Free · Open source · No ads · No telemetry
          </p>
        </div>
      </section>
    </>
  );
}
