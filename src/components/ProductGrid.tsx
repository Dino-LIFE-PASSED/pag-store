'use client'

// ─────────────────────────────────────────────
// ไฟล์นี้มีแค่ HTML/UI เท่านั้น
// Logic ทั้งหมดอยู่ที่ hooks/useProducts.ts
// ─────────────────────────────────────────────

import { useProducts } from '@/hooks/useProducts'
import { formatPrice } from '@/lib/formatters'
import StockBadge from './StockBadge'
import CategoryFilter from './CategoryFilter'
import { Search, RefreshCw } from 'lucide-react'

export default function ProductGrid() {
  const {
    filtered, categories, loading, error,
    realtimeActive, lastUpdate,
    search, setSearch,
    category, setCategory,
    fetchProducts,
  } = useProducts()

  // ── Loading state ───────────────────────────
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">กำลังโหลดสินค้า...</p>
      </div>
    )
  }

  // ── Error state ─────────────────────────────
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <p className="text-4xl">⚠️</p>
        <p className="text-slate-600 font-medium">{error}</p>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          ลองใหม่
        </button>
      </div>
    )
  }

  // ── UI ─────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาสินค้า..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-slate-300 bg-white"
          />
        </div>
        <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
      </div>

      {/* Realtime Status */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${realtimeActive ? 'bg-emerald-400 animate-pulse-dot' : 'bg-slate-300'}`} />
          {realtimeActive ? 'อัปเดตแบบ Realtime' : 'กำลังเชื่อมต่อ...'}
        </div>
        {lastUpdate && (
          <div className="flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            อัปเดตล่าสุด {lastUpdate.toLocaleTimeString('th-TH')}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500">
        แสดง <span className="font-semibold text-slate-700">{filtered.length}</span> รายการ
        {category && ` ใน "${category}"`}
      </p>

      {/* Product Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg">ไม่พบสินค้าที่ค้นหา</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 font-semibold text-slate-600">สินค้า</th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600 hidden sm:table-cell">หมวดหมู่</th>
                <th className="text-right px-6 py-3 font-semibold text-slate-600">ราคา</th>
                <th className="text-center px-6 py-3 font-semibold text-slate-600">สต็อก</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors animate-fade-in">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{product.name}</p>
                    {product.description && (
                      <p className="text-xs text-slate-400 mt-0.5">{product.description}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    {product.category
                      ? <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">{product.category}</span>
                      : <span className="text-slate-300">-</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold ${product.price === 0 ? 'text-slate-400 text-xs' : 'text-slate-800'}`}>
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StockBadge stock={product.stock} discontinued={product.discontinued} animate={realtimeActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
