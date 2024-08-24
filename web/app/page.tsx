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
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { getPopularBarbershops } from "./_data/get-popular-barbershops";
import { getBarbershops } from "./_data/get-barbershops";
import { getMostVisitedBarbershops } from "./_data/get-most-visited-barbershops";
import { ScrollButton } from "./_components/scroll-button";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const barbershops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  const mostVisitedBarbershops = await getMostVisitedBarbershops()
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div className="w-full">
      <Header />
      <div className="flex lg:justify-between relative p-5 gap-6 lg:gap-32 lg:px-32 lg:bg-black">
        <Image src="/background.png" alt="" fill className="hidden lg:block object-cover absolute inset-0" />
          
        <div className="flex flex-col w-full gap-6 lg:gap-12 lg:w-1/3">
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
                        isLargeScreen={true}
                      />
                    ))
                  }
                </div>
              </section>  
            )
          }
        </div>
      
        <section className="hidden lg:flex lg:flex-col lg:relative lg:w-1/2">
          <Heading title="Recomendados" />
          <div
            id="recommended" 
            className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden"
          >
            {
              barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <ScrollButton 
            direction="left"
            sessionId="recommended"
          />

          <ScrollButton 
            direction="right"
            sessionId="recommended"
          />
        </section>
      </div>
      <div className="flex flex-col p-5 gap-6 lg:px-32">
        
        <section className="lg:relative">
          <Heading title="Populares" />
          <div 
            id="populars"
            className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <ScrollButton 
            direction="left"
            sessionId="populars"
          />

          <ScrollButton 
            direction="right"
            sessionId="populars"
          />
        </section>

        <section className="lg:relative lg:mb-24">
          <Heading title="Mais Visitados" />
          <div 
            id="most-visited"
            className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden"
          >
            {
              mostVisitedBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>

          <ScrollButton 
            direction="left"
            sessionId="most-visited" 
          />

          <ScrollButton 
            direction="right"
            sessionId="most-visited" 
          />
        </section>
      </div>
    </div>
  );
}