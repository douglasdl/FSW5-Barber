import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronsLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id
    }
  })

  if(!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative w-full h-[250px]">
        <Image 
          src={barbershop?.imageUrl} 
          alt={barbershop?.name}
          className="object-cover" 
          fill 
        />

        <Button 
          className="absolute left-4 top-4" 
          size="icon"
          variant="secondary"
          asChild
        >
          <Link href="/">
            <ChevronsLeftIcon />
          </Link>
        </Button>

        <Button 
          className="absolute right-4 top-4" 
          size="icon"
          variant="secondary"
        >
          <MenuIcon />
        </Button>
      </div>
        <div className="p-5 border-b border-solid">
          <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
          
          <div className="flex items-center gap-2 mb-2">
            <MapPinIcon className="text-primary" size={18} />
            <p className="text-sm">{barbershop?.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <StarIcon className="text-primary fill-primary" size={18} />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>
        </div>

        <div className="border-b border-solid p-5 space-y-2">
          <h2 className="text-xs font-bold uppercase text-gray-400">Sobre Nós</h2>
          <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>
    </div>
  )
}