'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/pag-logo.png"
            alt="PAG Logo"
            width={64}
            height={64}
            className="object-contain mx-auto mb-4"
            priority
          />
          <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
          <p className="text-slate-500 text-sm mt-1">PAG | Pro Audio Gadgets</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">อีเมล</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-slate-700">รหัสผ่าน</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium
                       hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-4">
          <a href="/" className="hover:text-slate-600">← กลับหน้าหลัก</a>
        </p>
      </div>
    </div>
  )
}
