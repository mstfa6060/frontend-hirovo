import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white/10 border-t border-white/20 text-white">
      <div className="max-w-[1120px] mx-auto px-5 py-4 flex justify-between items-center flex-wrap gap-3">
        <span>&copy; 2025 Hirovo</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="text-white hover:underline">
            Gizlilik Politikasi
          </Link>
          <Link href="/terms" className="text-white hover:underline">
            Kullanim Sartlari
          </Link>
          <Link href="/" className="text-white hover:underline">
            Ana Sayfa
          </Link>
        </div>
      </div>
    </footer>
  )
}
