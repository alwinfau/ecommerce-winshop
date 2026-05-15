export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export function getDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100);
}
