'use client'

type Props = {
  stock: number
  discontinued?: boolean
  animate?: boolean
}

export default function StockBadge({ stock, discontinued = false, animate = false }: Props) {
  // 1. Discontinued — override ทุกอย่าง
  if (discontinued) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-400 border border-slate-200">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        Discontinued
      </span>
    )
  }

  // 2. Pre-order — stock หมดแต่ยังขายได้
  if (stock === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600 border border-blue-100">
        <span className={`w-1.5 h-1.5 rounded-full bg-blue-400 ${animate ? 'animate-pulse-dot' : ''}`} />
        Pre-order
      </span>
    )
  }

  // 3. Low stock — เหลือ 1–2 ชิ้น
  if (stock <= 2) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
        <span className={`w-1.5 h-1.5 rounded-full bg-amber-400 ${animate ? 'animate-pulse-dot' : ''}`} />
        เหลือ {stock} ชิ้น
      </span>
    )
  }

  // 4. Ready in stock — มีมากกว่า 2 ชิ้น
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
      <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${animate ? 'animate-pulse-dot' : ''}`} />
      Ready in stock
    </span>
  )
}
