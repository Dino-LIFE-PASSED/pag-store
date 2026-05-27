'use client'

// ─────────────────────────────────────────────
// Logic ทั้งหมดของหน้า Admin อยู่ที่นี่ที่เดียว
// ─────────────────────────────────────────────

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, type Product } from '@/lib/supabase'

export function useAdminProducts() {
  const router = useRouter()

  const [products, setProducts]   = useState<Product[]>([])
  const [loading, setLoading]     = useState(true)
  const [updating, setUpdating]   = useState<string | null>(null)
  const [search, setSearch]       = useState('')
  const [userEmail, setUserEmail] = useState('')

  // ── ดึงข้อมูลจาก Supabase ──────────────────
  const fetchProducts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('category')
        .order('name')
      if (error) throw error
      setProducts(data ?? [])
    } catch (err) {
      console.error('fetchProducts error:', err)
    } finally {
      setLoading(false)   // ← รันเสมอ ไม่ติด loading ตลอดกาล
    }
  }, [])

  // ── ตรวจสอบ auth ก่อนเสมอ ──────────────────
  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data: { user } }) => {
        if (!user) {
          router.push('/admin/login')
        } else {
          setUserEmail(user.email ?? '')
          fetchProducts()
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
  }, [router, fetchProducts])

  // ── อัปเดตจำนวน stock (+1 / -1) ───────────
  async function updateStock(id: string, delta: number) {
    setUpdating(id)
    const product = products.find((p) => p.id === id)
    if (!product) { setUpdating(null); return }

    const newStock = Math.max(0, product.stock + delta)
    const { data, error } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)))
    }
    setUpdating(null)
  }

  // ── toggle discontinued on/off ─────────────
  async function toggleDiscontinued(id: string) {
    setUpdating(id)
    const product = products.find((p) => p.id === id)
    if (!product) { setUpdating(null); return }

    const { data, error } = await supabase
      .from('products')
      .update({ discontinued: !product.discontinued })
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)))
    }
    setUpdating(null)
  }

  // ── ออกจากระบบ ─────────────────────────────
  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  // ── คำนวณ derived state ─────────────────────
  const filtered          = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  const totalProducts     = products.length
  const inStockCount      = products.filter((p) => p.stock > 0 && !p.discontinued).length
  const preOrderCount     = products.filter((p) => p.stock === 0 && !p.discontinued).length
  const discontinuedCount = products.filter((p) => p.discontinued).length

  return {
    // ข้อมูล
    filtered,
    loading,
    updating,
    userEmail,
    // stats
    totalProducts,
    inStockCount,
    preOrderCount,
    discontinuedCount,
    // search
    search, setSearch,
    // actions
    fetchProducts,
    updateStock,
    toggleDiscontinued,
    handleLogout,
  }
}
