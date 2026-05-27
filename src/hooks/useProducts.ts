'use client'

// ─────────────────────────────────────────────
// Logic ทั้งหมดของหน้าลูกค้า อยู่ที่นี่ที่เดียว
// ─────────────────────────────────────────────

import { useEffect, useState, useCallback } from 'react'
import { supabase, type Product } from '@/lib/supabase'

export function useProducts() {
  const [products, setProducts]             = useState<Product[]>([])
  const [loading, setLoading]               = useState(true)
  const [error, setError]                   = useState<string | null>(null)
  const [search, setSearch]                 = useState('')
  const [category, setCategory]             = useState('')
  const [lastUpdate, setLastUpdate]         = useState<Date | null>(null)
  const [realtimeActive, setRealtimeActive] = useState(false)

  // ── ดึงข้อมูลจาก Supabase ──────────────────
  const fetchProducts = useCallback(async () => {
    try {
      setError(null)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('category')
        .order('name')

      if (error) throw error

      setProducts(data ?? [])
      setLastUpdate(new Date())
    } catch (err) {
      console.error('fetchProducts error:', err)
      setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่')
    } finally {
      setLoading(false)   // ← รันเสมอ ไม่ติด loading ตลอดกาล
    }
  }, [])

  // ── เริ่มต้น + subscribe realtime ──────────
  useEffect(() => {
    fetchProducts()

    const channel = supabase
      .channel('products-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'UPDATE') {
          setProducts((prev) =>
            prev.map((p) => (p.id === (payload.new as Product).id ? (payload.new as Product) : p))
          )
        } else if (payload.eventType === 'INSERT') {
          setProducts((prev) => [...prev, payload.new as Product])
        } else if (payload.eventType === 'DELETE') {
          setProducts((prev) => prev.filter((p) => p.id !== (payload.old as Product).id))
        }
        setLastUpdate(new Date())
      })
      .subscribe((status) => setRealtimeActive(status === 'SUBSCRIBED'))

    return () => { supabase.removeChannel(channel) }
  }, [fetchProducts])

  // ── คำนวณ derived state ─────────────────────
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))]

  const filtered = products.filter((p) => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !category || p.category === category
    return matchSearch && matchCategory
  })

  return {
    // ข้อมูล
    filtered,
    categories,
    loading,
    error,
    // realtime status
    realtimeActive,
    lastUpdate,
    // filter state
    search,    setSearch,
    category,  setCategory,
    // retry
    fetchProducts,
  }
}
