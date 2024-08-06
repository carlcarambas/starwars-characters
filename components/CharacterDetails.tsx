// import { Button } from '@/components/ui/button'
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getApi } from '@/lib/api'
import { useEffect, useState } from 'react'

const CharacterDetails = ({ detail }: { detail: Character }) => {
  const [characterFilms, setCharacterFilms] = useState<any[]>([])
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const controller = new AbortController()
    try {
      if (detail?.films.length) {
        setLoading(true)
        const fetchFilms = async () => {
          const filmsPromises = detail?.films.map((filmLink) => {
            return getApi(`${filmLink}`, controller.signal)
          })

          const filmsResponse = await Promise.allSettled(filmsPromises)
          const allFilms = filmsResponse.flatMap((resp) => {
            if (resp.status === 'fulfilled') return resp.value
          })
          setCharacterFilms(allFilms)
        }

        fetchFilms()
      }
    } catch (filmsError) {
      setError(filmsError)
    } finally {
      setLoading(false)
    }

    return () => {
      if (error) controller.abort()
    }
  }, [])
  return (
    <Dialog>
      {/* <Button variant="outline">Character Profile</Button> */}
      <DialogTrigger asChild>
        <div className="cursor-pointer">Character Profile</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{detail.name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <div className="flex flex-row gap-x-2 justify-center items-center xl:justify-normal">
              <p>Height: {detail.height}</p>
              <p>Weight: {detail.mass}</p>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Films:</h4>
              <div className="grid xl:grid-cols-2 gap-1 my-4">
                {characterFilms &&
                  characterFilms.map((film, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-4 mx-auto xl:mx-0"
                    >
                      <div className="text-primary">{film?.title}</div>
                    </div>
                  ))}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CharacterDetails
