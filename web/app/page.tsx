import { SearchIcon } from "lucide-react";
import { Header } from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { BarbershopItem } from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { Footer } from "./_components/footer";
import { quickSearchOptions } from "./_constants/search";
import { BookingItem } from "./_components/booking-item";

export default async function Home() {

  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  });

  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 gap-6">
        <h2 className="text-xl font-bold">Olá, Douglas!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="flex items-center gap-2">
          <Input placeholder="Buscar" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {
            quickSearchOptions.map(option => (
              <Button className="gap-2" variant="secondary" key={option.title}>
                <Image src={option.imageUrl} alt={option.title} width={16} height={16} />
                {option.title}
              </Button>
            ))
          }
        </div>

        <div className="relative w-full h-[150px]">
          <Image src="/banner-01.png" alt="Banner" fill className="object-cover rounded-xl" />
        </div>

        <BookingItem />

        <section>
          <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">Recomendados</h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>
        </section>
        
        <section>
          <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">Populares</h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>
        </section>
      </div>
    </div>
  );
}