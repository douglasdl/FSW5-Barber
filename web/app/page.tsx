import { Header } from "./_components/header";
import Image from "next/image";
import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Search } from "./_components/search";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { Heading } from "./_components/heading";
import { Greetings } from "./_components/greetings";
import { QuickSearchButtons } from "./_components/quick-search-buttons";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { getPopularBarbershops } from "./_data/get-popular-barbershops";
import { getBarbershops } from "./_data/get-barbershops";
import { getMostVisitedBarbershops } from "./_data/get-most-visited-barbershops";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const barbershops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  const mostVisitedBarbershops = await getMostVisitedBarbershops()
  const confirmedBookings = await getConfirmedBookings()
  
  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 gap-6 lg:px-32">
        
        <Greetings session={session} />
        
        <Search />

        <QuickSearchButtons />

        <div className="relative w-full h-[150px] lg:hidden">
          <Image src="/banner-01.png" alt="Banner" fill className="object-cover rounded-xl" />
        </div>

        {
          confirmedBookings.length > 0 && (
            <section className="lg:relative">
              <Heading title="Agendamentos" />
              <div className="flex overflow-x-auto gap-4 [&::-webkit-scrollbar]:hidden">
                {
                  confirmedBookings.map((booking) => (
                    <BookingItem 
                      key={booking.id}
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))
                }
              </div>
            </section>  
          )
        }

        <section className="lg:relative">
          <Heading title="Recomendados" />
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <Button className="lg:absolute lg:z-50 lg:-right-8 lg:top-36 lg:rounded-full lg:w-16 lg:h-16 lg:p-0" variant="outline">
            <ChevronRightIcon size={48} />
          </Button>
        </section>
        
        <section className="lg:relative">
          <Heading title="Populares" />
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <Button className="lg:absolute lg:z-50 lg:-right-8 lg:top-36 lg:rounded-full lg:w-16 lg:h-16 lg:p-0" variant="outline">
            <ChevronRightIcon size={48} />
          </Button>
        </section>

        <section className="lg:relative">
          <Heading title="Mais Visitados" />
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              mostVisitedBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <Button className="lg:absolute lg:z-50 lg:-right-8 lg:top-36 lg:rounded-full lg:w-16 lg:h-16 lg:p-0" variant="outline">
            <ChevronRightIcon size={48} />
          </Button>
        </section>
      </div>
    </div>
  );
}