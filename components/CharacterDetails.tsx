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
import { Skeleton } from './ui/skeleton'

const CharacterDetails = ({ detail }: { detail: Character }) => {
  const [characterFilms, setCharacterFilms] = useState<any[]>([])
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    const controller = new AbortController()
    try {
      if (detail?.films.length && isDialogOpen) {
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

        fetchFilms().finally(() => setLoading(false))
      }
    } catch (filmsError) {
      setError(filmsError)
    }

    return () => {
      if (error) controller.abort()
    }
  }, [isDialogOpen])

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen)
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={isDialogOpen}>
      {/* <Button variant="outline">Character Profile</Button> */}
      <DialogTrigger asChild>
        <div className="cursor-pointer">Character Profile</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{detail.name}</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <section className="flex flex-row gap-x-2 justify-center items-center xl:justify-normal">
              <span>Height: {detail.height}</span>
              <span>Weight: {detail.mass}</span>
            </section>
            <section className="mt-2">
              <span className="font-semibold">Films:</span>
              {loading && (
                <div className="grid xl:grid-cols-2 gap-[10px] my-4 justify-center">
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[180px]" />
                  <Skeleton className="h-4 w-[180px]" />
                </div>
              )}
              {!loading && (
                <div className="grid xl:grid-cols-2 gap-1 my-4">
                  {!loading &&
                    characterFilms &&
                    characterFilms.map((film, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-x-4 mx-auto xl:mx-0"
                      >
                        <div className="text-primary">{film?.title}</div>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CharacterDetails
