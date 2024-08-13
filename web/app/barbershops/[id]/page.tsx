import { Heading } from "@/app/_components/heading"
import { Phones } from "@/app/_components/phones"
import { ServiceItem } from "@/app/_components/service-item"
import { SidebarSheet } from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
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
    },
    include: {
      services: true
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

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="absolute right-4 top-4">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
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
          <Heading title="Sobre Nós" />
          <p className="text-sm text-justify">{barbershop?.description}</p>
        </div>

        <div className="border-b border-solid p-5 space-y-3">
          <Heading title="Serviços" />
          <div className="space-y-3">
            {
              barbershop.services.map((service) => (
                <ServiceItem 
                  key={service.id}
                  barbershop={JSON.parse(JSON.stringify(barbershop))}
                  service={JSON.parse(JSON.stringify(service))}
                />
              ))
            }
          </div>
        </div>

        <div className="border-b border-solid p-5">
          <Heading title="Contato" />
          <Phones phones={barbershop.phones} />
        </div>
    </div>
  )
}