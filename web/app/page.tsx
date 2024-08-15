import { Header } from "./_components/header";
import Image from "next/image";
import { BarbershopItem } from "./_components/barbershop-item";
import { BookingItem } from "./_components/booking-item";
import { Search } from "./_components/search";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { Heading } from "./_components/heading";
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { Greetings } from "./_components/greetings";
import { QuickSearchButtons } from "./_components/quick-search-buttons";
import { getPopularBarbershops } from "./_data/get-popular-barbershops";
import { getBarbershops } from "./_data/get-barbershops";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const barbershops = await getBarbershops()
  const popularBarbershops = await getPopularBarbershops()
  const confirmedBookings = await getConfirmedBookings()
  
  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 gap-6">
        
        <Greetings session={session} />
        
        <Search />

        <QuickSearchButtons />

        <div className="relative w-full h-[150px]">
          <Image src="/banner-01.png" alt="Banner" fill className="object-cover rounded-xl" />
        </div>

        {
          confirmedBookings.length > 0 && (
            <section>
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

        <section>
          <Heading title="Recomendados" />
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>
        </section>
        
        <section>
          <Heading title="Populares" />
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