import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Heading } from "../_components/heading"
import { Search } from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    title?: string,
    service?: string
  }
}

export default async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
  
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title 
        ?
        {
          name: {
            contains: searchParams?.title,
            mode: "insensitive"
          }
        } : {},
        searchParams?.service
        ?
        {
          services: {
            some: {
              name: {
                contains: searchParams?.service,
                mode: "insensitive"
              }
            }
          }
        } : {}
      ]
    }
  })
  
  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 gap-6">
        <Search />
      
        <Heading title={`Resultados para ${searchParams?.title || searchParams?.service}`} />

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}