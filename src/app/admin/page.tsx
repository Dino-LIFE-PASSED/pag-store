'use client'

// ─────────────────────────────────────────────
// ไฟล์นี้มีแค่ HTML/UI เท่านั้น
// Logic ทั้งหมดอยู่ที่ hooks/useAdminProducts.ts
// ─────────────────────────────────────────────

import { useAdminProducts } from '@/hooks/useAdminProducts'
import { formatPriceAdmin } from '@/lib/formatters'
import StockBadge from '@/components/StockBadge'
import { Plus, Minus, LogOut, RefreshCw, Package, Search, Ban } from 'lucide-react'

export default function AdminPage() {
  const {
    filtered, loading, updating, userEmail,
    totalProducts, inStockCount, preOrderCount, discontinuedCount,
    search, setSearch,
    fetchProducts, updateStock, toggleDiscontinued, handleLogout,
  } = useAdminProducts()

  // ── Loading state ───────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
      </div>
    )
  }

  // ── UI ─────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-0.5">{userEmail}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-100">
              ← หน้าลูกค้า
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Stats — 4 cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <Package className="w-5 h-5 text-slate-400 mx-auto mb-1" />
            <p className="text-2xl font-bold text-slate-900">{totalProducts}</p>
            <p className="text-xs text-slate-500 mt-0.5">ทั้งหมด</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-emerald-600">{inStockCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">Ready in stock</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{preOrderCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">Pre-order</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <p className="text-2xl font-bold text-slate-400">{discontinuedCount}</p>
            <p className="text-xs text-slate-500 mt-0.5">Discontinued</p>
          </div>
        </div>

        {/* Search & Refresh */}
        <div className="flex gap-3 items-center">
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
          <button
            onClick={fetchProducts}
            className="flex items-center gap-1.5 px-4 py-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            รีเฟรช
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 font-semibold text-slate-600">สินค้า</th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600 hidden md:table-cell">หมวดหมู่</th>
                <th className="text-right px-6 py-3 font-semibold text-slate-600 hidden sm:table-cell">ราคา</th>
                <th className="text-center px-6 py-3 font-semibold text-slate-600">สถานะ</th>
                <th className="text-center px-6 py-3 font-semibold text-slate-600">จัดการ stock</th>
                <th className="text-center px-6 py-3 font-semibold text-slate-600">Discontinued</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className={`transition-colors ${product.discontinued ? 'bg-slate-50 opacity-60' : 'hover:bg-slate-50'}`}
                >
                  <td className="px-6 py-3">
                    <p className={`font-medium ${product.discontinued ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{product.handle}</p>
                  </td>
                  <td className="px-6 py-3 hidden md:table-cell">
                    {product.category
                      ? <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs">{product.category}</span>
                      : <span className="text-slate-300">-</span>
                    }
                  </td>
                  <td className="px-6 py-3 text-right hidden sm:table-cell">
                    <span className="text-slate-700 font-medium">{formatPriceAdmin(product.price)}</span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <StockBadge stock={product.stock} discontinued={product.discontinued} />
                  </td>

                  {/* +/- stock (disabled ถ้า discontinued) */}
                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateStock(product.id, -1)}
                        disabled={product.stock === 0 || updating === product.id || product.discontinued}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center
                                   hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors
                                   disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center font-semibold text-slate-800 tabular-nums">
                        {updating === product.id
                          ? <span className="text-slate-300">...</span>
                          : product.stock
                        }
                      </span>
                      <button
                        onClick={() => updateStock(product.id, 1)}
                        disabled={updating === product.id || product.discontinued}
                        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center
                                   hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-colors
                                   disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Toggle Discontinued */}
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => toggleDiscontinued(product.id)}
                      disabled={updating === product.id}
                      title={product.discontinued ? 'คลิกเพื่อ Reactivate' : 'คลิกเพื่อ Discontinue'}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40
                        ${product.discontinued
                          ? 'bg-slate-800 text-white hover:bg-slate-600'
                          : 'bg-white border border-slate-200 text-slate-500 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                        }`}
                    >
                      <Ban className="w-3.5 h-3.5" />
                      {product.discontinued ? 'Reactivate' : 'Discontinue'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
