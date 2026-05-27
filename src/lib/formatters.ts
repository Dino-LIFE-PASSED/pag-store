// ฟังก์ชัน utility รวมไว้ที่เดียว ใช้ร่วมกันได้ทุก component

export function formatPrice(price: number): string {
  if (price === 0) return 'ติดต่อสอบถาม'
  return price.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  })
}

export function formatPriceAdmin(price: number): string {
  if (price === 0) return '-'
  return price.toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0,
  })
}
