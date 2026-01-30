interface ContentCardProps {
  children: React.ReactNode
}

export default function ContentCard({ children }: ContentCardProps) {
  return (
    <div className="bg-white text-text rounded-3xl p-12 shadow-card max-sm:p-7 max-sm:rounded-2xl">
      {children}
    </div>
  )
}
