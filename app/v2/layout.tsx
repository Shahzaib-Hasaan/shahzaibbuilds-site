import LenisProvider from './_components/LenisProvider';

export const metadata = {
  title: 'Shahzaib Hassan | v2 — AI Automation Engineer',
  description:
    'v2 of shahzaibbuilds.me. AI automation engineer, educator, and rebuilt-from-zero LinkedIn survivor. From pre-med in Bahawalpur to production AI in Lahore.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LenisProvider />
      {children}
    </>
  );
}
