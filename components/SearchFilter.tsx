'use client'
import { useState, useEffect } from 'react'
import { useSearch } from './context/context'
import { Input } from './ui/input'

const SearchFilter = () => {
  const { query, setQuery } = useSearch()
  const [inputValue, setInputValue] = useState(query)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setQuery(inputValue)
    }, 600)

    return () => clearTimeout(debounceTimer)
  }, [inputValue, setQuery])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <section className="flex w-full max-w-sm items-center space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        className="border-4 focus:border-black-500"
      />
    </section>
  )
}

export default SearchFilter
