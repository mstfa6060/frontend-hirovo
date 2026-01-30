import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="max-w-[1120px] mx-auto px-5 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-text no-underline">
          <Image
            src="/logo/hirovo_logo_white.png"
            alt="Hirovo"
            width={28}
            height={28}
            className="object-contain rounded-md"
          />
          <strong>Hirovo</strong>
        </Link>
        <a
          href="https://play.google.com/store/apps/details?id=com.hirovo_mobil_bare"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150"
        >
          Indir
        </a>
      </div>
    </header>
  )
}
