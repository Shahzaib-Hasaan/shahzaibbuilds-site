'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const categories = [
  { slug: '', label: 'All' },
  { slug: 'tutorials', label: 'Tutorials' },
  { slug: 'insights', label: 'Insights' },
  { slug: 'building', label: 'Building' },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category') ?? '';

  function handleFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => handleFilter(cat.slug)}
            className={`px-4 py-2 rounded-lg text-sm font-sans transition-all duration-200 ${
              isActive
                ? 'bg-amber-accent text-white'
                : 'bg-white border border-warm-border text-ink-muted hover:text-ink hover:border-amber-accent/40'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
