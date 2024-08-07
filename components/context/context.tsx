'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react'

interface SearchContextType {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  filter: IFilter
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>
  homeworldUrls: string[]
  setHomeworldUrls: React.Dispatch<React.SetStateAction<string[]>>
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
)

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>('')
  const [filter, setFilter] = useState<IFilter>({ gender: '', homeworld: '' })
  const [homeworldUrls, setHomeworldUrls] = useState<string[]>([])

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        filter,
        setFilter,
        homeworldUrls,
        setHomeworldUrls,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
