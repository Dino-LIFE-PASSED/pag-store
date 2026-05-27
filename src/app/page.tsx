import Image from 'next/image'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/pag-logo.png"
              alt="PAG Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <div>
              <p className="text-sm font-bold text-slate-900 leading-tight tracking-tight">
                Pro Audio Gadgets
              </p>
              <p className="text-xs text-slate-400">ราคาและสต็อกสินค้า</p>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ProductGrid />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <Image src="/pag-logo.png" alt="PAG" width={16} height={16} className="object-contain opacity-40" />
          © {new Date().getFullYear()} PAG | Pro Audio Gadgets — ราคาอาจเปลี่ยนแปลงได้โดยไม่แจ้งล่วงหน้า
        </div>
      </footer>
    </div>
  )
}
