import { Header } from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { BarbershopItem } from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { quickSearchOptions } from "./_constants/search";
import { BookingItem } from "./_components/booking-item";
import { Search } from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { Heading } from "./_components/heading";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {

  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  });
  
  const confirmedBookings = (session?.user as any).id 
    ? await db.booking.findMany({
      where: {
        userId: "clzmetgrs0001immc3pepmw80",
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: "asc"
      },
      include: {
        service: {
          include: {
            barbershop: true
          }
        }
      }
    })
    : []
  
  function getFormattedDate(): string {
    const now = new Date();
    
    // Format the day and month names
    const day = format(now, "EEE, dd", { locale: ptBR });
    const month = format(now, "MMMM", { locale: ptBR });
    
    // Capitalize the first letter of the day and month
    const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
  
    // Return the formatted string with "de" in lowercase
    return `${capitalize(day)} de ${capitalize(month)}`;
  }
    
  return (
    <div>
      <Header />
      <div className="flex flex-col p-5 gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl">
            Olá,&nbsp;
            <span className="font-bold">{session?.user ? session.user.name : "Faça seu Login!"}</span>
          </h2>
          <p>
            <span>{ getFormattedDate() }</span>
          </p>
        </div>

        <Search />

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {
            quickSearchOptions.map(option => (
              <Button className="gap-2" variant="secondary" key={option.title} asChild>
                <Link href={`/barbershops?service=${option.title}`}>
                  <Image src={option.imageUrl} alt={option.title} width={16} height={16} />
                  {option.title}
                </Link>
              </Button>
            ))
          }
        </div>

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