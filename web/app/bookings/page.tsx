import { getServerSession } from "next-auth";
import { Header } from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import { BookingItem } from "../_components/booking-item";

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  if(!session?.user) {
    // TODO show login popup
    // return notFound();
  }

  // userId: (session?.user as any).id
  const bookings = await db.booking.findMany({
    where: {
      userId: "clzmetgrs0001immc3pepmw80"
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  })

  return (
    <>
      <Header />

      <div className="flex flex-col p-5 gap-3">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {
          bookings.map((booking) => (
            <BookingItem 
              key={booking.id} 
              booking={booking}
            />
          ))
        }
      </div>
    </>
  )
}