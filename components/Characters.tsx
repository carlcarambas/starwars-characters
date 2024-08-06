'use client'
import { baseUrl, getApi } from '@/lib/api'
import { useEffect, useState } from 'react'
import { Pagination } from './Pagination'
import PaginationCn from './PaginationCn'
import CharacterCard from './CharacterCard'
import { Skeleton } from './ui/skeleton'

const Characters = () => {
  const [data, setData] = useState<ApiResponse>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [page, setPage] = useState<number>(1)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    const controller = new AbortController()
    try {
      const fetchCharacters = async () => {
        const characterResponse = await getApi(
          `${baseUrl}?page=${page}`,
          controller.signal
        )
        setData(characterResponse)
      }
      fetchCharacters().finally(() => setIsLoading(false))
    } catch (_error) {
      setError(error?.message)
    }

    return () => {
      if (error) controller.abort()
    }
  }, [page])

  return (
    <div>
      <div className="grid xl:grid-cols-3 gap-1 mb-4">
        {isLoading && (
          <>
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
            <Skeleton className="h-[250px] w-[250px] rounded-xl" />
          </>
        )}
        {error && <span>Error</span>}
        {!isLoading &&
          !error &&
          data?.results.map((char, index) => (
            <CharacterCard key={index} {...char} />
          ))}
      </div>
      <Pagination
        count={data?.count || 0}
        pageSize={10}
        currentPage={page}
        onPageChange={handlePageChange}
        nextPageEnabled={!!data?.next}
        prevPageEnabled={!!data?.previous}
      />
    </div>
  )
}

export default Characters
