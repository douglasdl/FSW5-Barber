import { getFilteredBarbershops } from "../_data/get-filtered-barbershops"
import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Heading } from "../_components/heading"
import { Search } from "../_components/search"

interface BarbershopsPageProps {
  searchParams: {
    title?: string,
    service?: string
  }
}

export default async function BarbershopsPage({ searchParams }: BarbershopsPageProps) {
  
  const barbershops = await getFilteredBarbershops({ searchParams });
  
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