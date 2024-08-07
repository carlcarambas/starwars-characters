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
import { Skeleton } from './ui/skeleton'
import { getApi } from '@/lib/api'
import { removeDuplicates } from '@/lib/utils'

const options = [
  { value: 'clear', label: 'All' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'n/a', label: 'N/A' },
]

const initWorldOptions = [{ value: 'clear', label: 'All' }]

const SearchFilter = () => {
  const { query, setQuery, filter, setFilter, homeworldUrls } = useSearch()
  const [inputValue, setInputValue] = useState(query)
  const [isLoadingHome, setIsLoadingHome] = useState(true)
  const [worldOptions, setWorldOptions] = useState<IFilterOption[]>([])

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
    setFilter({
      ...filter,
      gender: newGenderFilter === 'clear' ? '' : newGenderFilter,
    })
  }

  const handleHomeChange = (newHomeFilter: string) => {
    setFilter({
      ...filter,
      homeworld: newHomeFilter === 'clear' ? '' : newHomeFilter,
    })
  }

  const handleOnOpenChange = (isHomeFilterOpen: any) => {
    let error = null
    const controller = new AbortController()
    if (isHomeFilterOpen) {
      try {
        const homePromises = homeworldUrls.map((url) => {
          return getApi(url, controller.signal)
        })
        // load options here
        const fetchWorldDetails = async () => {
          return await Promise.all(homePromises)
        }

        fetchWorldDetails()
          .then((planets: Planet[]) => {
            const uniqueWorlds = removeDuplicates(planets, 'name')
            const worldOptions = uniqueWorlds.map((planet: Planet) => {
              return { value: planet.url, label: planet.name }
            })
            setWorldOptions([...initWorldOptions, ...worldOptions])
          })
          .finally(() => setIsLoadingHome(false))
      } catch (fetchHomeError) {
        error = fetchHomeError
      }
    }

    return () => {
      if (error) controller.abort()
    }
  }

  return (
    <section className="flex w-full max-w-2xl items-center space-x-2 mb-6">
      <Input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        className="border-2 focus:border-black-500"
      />
      {/* Gender */}
      <Select onValueChange={handleGenderChange} value={filter?.gender}>
        <SelectTrigger className="w-[250px]">
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
      {/* Homeworld */}
      <Select
        onValueChange={handleHomeChange}
        onOpenChange={handleOnOpenChange}
        value={filter?.homeworld}
      >
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Home" />
        </SelectTrigger>
        <SelectContent>
          {isLoadingHome && <Skeleton className="h-4 w-[95%] m-2" />}
          {worldOptions &&
            !isLoadingHome &&
            worldOptions.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </section>
  )
}

export default SearchFilter
