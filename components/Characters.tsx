'use client'
import { getApi } from '@/lib/api'
import { useEffect, useState } from 'react'

const Characters = () => {
  const [characters, setCharacters] = useState<StarWarsCharacter[]>([])
  useEffect(() => {
    const controller = new AbortController()
    const fetchCharacters = async () => {
      const characterResponse = await getApi(
        'https://swapi.dev/api/people',
        controller.signal
      )
      setCharacters(characterResponse.results)
    }
    fetchCharacters()

    return () => {
      controller.abort()
    }
  }, [])
  return (
    <div>
      {characters.map((char) => (
        <div className="border">
          <h1>{char?.name}</h1>
          <p>{char.birth_year}</p>
          <p>{char.gender}</p>
          <p>{char.species}</p>
        </div>
      ))}
    </div>
  )
}

export default Characters
