'use client'

type Props = {
  categories: string[]
  selected: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, selected, onChange }: Props) {
  const all = ['ทั้งหมด', ...categories]

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat === 'ทั้งหมด' ? '' : cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all
            ${(cat === 'ทั้งหมด' && selected === '') || selected === cat
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
