import Characters from '@/components/Characters'
import { SearchProvider } from '@/components/context/context'
import SearchFilter from '@/components/SearchFilter'

export default function Home() {
  return (
    <SearchProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <SearchFilter />
        <Characters />
      </main>
    </SearchProvider>
  )
}
