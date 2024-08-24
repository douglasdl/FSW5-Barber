import { getBarbershop } from "@/app/_data/get-barbershop"
import { Heading } from "@/app/_components/heading"
import { Phones } from "@/app/_components/phones"
import { ServiceItem } from "@/app/_components/service-item"
import { SidebarSheet } from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "@/app/_components/header"
import { Card } from "@/app/_components/ui/card"
import { BarbershopMap } from "@/app/_components/barbershop-map"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  
  const barbershop = await getBarbershop({ params })

  if(!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="hidden lg:block">
        <Header hasSearchBar />
      </div>
      <div className="flex gap-5 lg:gap-10">
        <div className="flex flex-col lg:w-2/3 lg:pl-32 lg:mt-10">
          <div className="relative w-full h-[250px] lg:h-[486px]">
            <Image 
              src={barbershop?.imageUrl} 
              alt={barbershop?.name}
              className="object-cover lg:rounded-xl" 
              fill 
            />

            <Button 
              className="absolute left-4 top-4 lg:hidden" 
              size="icon"
              variant="secondary"
              asChild
            >
              <Link href="/">
                <ChevronLeftIcon />
              </Link>
            </Button>

            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon" className="absolute right-4 top-4">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SidebarSheet />
            </Sheet>
          </div>
          <div className="p-5 border-b border-solid lg:border-b-0 lg:pb-0 lg:flex lg:items-center lg:justify-between">
            <div className="">
              <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
              
              <div className="flex items-center gap-2 mb-2">
                <MapPinIcon className="text-primary" size={18} />
                <p className="text-sm">{barbershop?.address}</p>
              </div>
            </div>

            <Card className="flex items-center gap-2 lg:flex-col lg:px-5 lg:py-3 bg-transparent lg:border lg:bg-card border-transparent lg:border-border">
              <span className="flex items-center gap-2">
                <StarIcon className="text-primary fill-primary" size={18} />
                5,0
              </span>
              <p className="text-sm">(889 avaliações)</p>
            </Card>
          </div>

          <div className="border-b border-solid p-5 space-y-2 lg:hidden">
            <Heading title="Sobre Nós" />
            <p className="text-sm text-justify">{barbershop?.description}</p>
          </div>

          <div className="border-b border-solid lg:border-b-0 p-5 space-y-3">
            <Heading title="Serviços" />
            <div className="gap-y-3 gap-x-4 lg:grid lg:grid-cols-2">
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
        </div>
        <Card className="hidden lg:flex lg:flex-col lg:w-1/3 rounded-2xl border-none p-5 lg:mr-32 lg:mt-10 lg:h-min">

          <div>
            <BarbershopMap 
              name={barbershop.name}
              imageUrl={barbershop.imageUrl}
              address={barbershop.address}
            />
          </div>

          <div className="hidden lg:block border-b border-solid p-5 lg:px-0 space-y-2">
            <Heading title="Sobre Nós" />
            <p className="text-sm text-justify">{barbershop?.description}</p>
          </div>

          <div className="border-b border-solid p-5 lg:px-0">
            <div className="lg:hidden">
              <Heading title="Contato" />
            </div>
            <Phones phones={barbershop.phones} />
          </div>

          <div className="flex flex-col gap-5 py-5 border-b border-solid">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Segunda
              </span>
              <span className="text-sm text-white">
                Fechado
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Terça-feira
              </span>
              <span className="text-sm text-white">
                09:00 - 21:00
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Quarta-feira
              </span>
              <span className="text-sm text-white">
                09:00 - 21:00
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Quinta-feira
              </span>
              <span className="text-sm text-white">
                09:00 - 21:00
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Sexta-feira
              </span>
              <span className="text-sm text-white">
                09:00 - 21:00
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Sábado
              </span>
              <span className="text-sm text-white">
                08:00 - 17:00
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                Domingo
              </span>
              <span className="text-sm text-white">
                Fechado
              </span>
            </div>

          </div>

          <div className="flex items-center justify-between mt-5 py-5">
            <span>Em parceria com</span>
            <Link href="/">
              <Image src="/logo.svg" height={18} width={120} alt="Logo" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}