'use client'
import { useState, useEffect } from 'react'
import { useSearch } from './context/context'
import { Input } from './ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'

const options = [
  { value: 'all', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'n/a', label: 'N/A' },
]

const SearchFilter = () => {
  const { query, setQuery, filter, setFilter } = useSearch()
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

  const handleGenderChange = (newGenderFilter: string) => {
    setFilter({ ...filter, gender: newGenderFilter })
  }

  return (
    <section className="flex w-full max-w-sm items-center space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        className="border-2 focus:border-black-500"
      />
      <Select onValueChange={handleGenderChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Gender" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </section>
  )
}

export default SearchFilter
