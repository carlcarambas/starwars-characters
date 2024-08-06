import Image from 'next/image'
import { Button } from './ui/button'
import { Card, CardHeader } from './ui/card'
import { BookUser } from 'lucide-react'
import CharacterDetails from './CharacterDetails'
import { DialogTrigger } from './ui/dialog'

const CharacterCard = (character: Character) => {
  return (
    <Card className="group overflow-hidden relative">
      <CardHeader className="p-5">
        <div
          className="relative w-full h-[100px] flex items-center justify-center
        bg-tertiary dark:bg-secondary/40 xl:bg-work_project_bg_light 
        xl:dark:bg-work_project_bg_dark xl:bg-[110%] xl:bg-no-repeat overflow-hidden"
        >
          <Image
            className="object-contain absolute bottom-0 shadow-2xl w-full h-full "
            src={Math.random() < 0.5 ? '/darkside.png' : '/jedi.png'}
            width={270}
            height={270}
            alt=""
          />
          <div
            className="bg-secondary w-[100%] h-[100%] rounded-md 
              flex justify-center items-center
              scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-80
              transition-all duration-400"
          >
            <BookUser className="mr-1" />
            <CharacterDetails detail={character} />
          </div>
        </div>
      </CardHeader>
      <div className="px-8 py-6 flex justify-center">
        <h4 className="h4">{character.name}</h4>
      </div>
    </Card>
  )
}

export default CharacterCard
