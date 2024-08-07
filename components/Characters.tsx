'use client'
import { baseUrl, getApi } from '@/lib/api'
import { useContext, useEffect, useState } from 'react'
import { Pagination } from './Pagination'
import CharacterCard from './CharacterCard'
import { Skeleton } from './ui/skeleton'
import { useSearch } from './context/context'

const Characters = () => {
  const [data, setData] = useState<ApiResponse>()
  const {
    query,
    filter: { gender },
  } = useSearch()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [page, setPage] = useState<number>(1)

  const [characters, setCharacters] = useState<Character[]>([])
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    const controller = new AbortController()
    try {
      const fetchCharacters = async () => {
        let queryUrl = `${baseUrl}${
          query ? `/?search=${query}` : `?page=${page}`
        }`
        const characterResponse = await getApi(queryUrl, controller.signal)
        setData(characterResponse)
        setCharacters(characterResponse?.results)
      }
      fetchCharacters().finally(() => setIsLoading(false))
    } catch (_error) {
      setError(error?.message)
    }

    return () => {
      if (error) controller.abort()
    }
  }, [page, query])

  useEffect(() => {
    if (gender && gender !== 'all') {
      setFilteredCharacters(characters.filter((char) => char.gender === gender))
    } else {
      setFilteredCharacters(characters)
    }
  }, [characters, gender])

  return (
    <div className="flex flex-col h-full">
      <div className="grid xl:grid-cols-3 gap-2 mb-4">
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
          filteredCharacters.map((char, index) => (
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
