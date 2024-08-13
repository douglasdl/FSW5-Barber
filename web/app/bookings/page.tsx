import { getServerSession } from "next-auth";
import { Header } from "../_components/header";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { notFound } from "next/navigation";
import { BookingItem } from "../_components/booking-item";
import { Heading } from "../_components/heading";

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  if(!session?.user) {
    // TODO show login popup
    return notFound();
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        gte: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session?.user as any).id,
      date: {
        lt: new Date()
      }
    },
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  return (
    <>
      <Header />

      <div className="flex flex-col p-5">
        <h1 className="text-xl font-bold mb-4">Agendamentos</h1>

        {
          confirmedBookings.length === 0 && concludedBookings.length  === 0 && (
            <p className="text-gray-400">
              Você não tem agendamentos.
            </p>
          )
        }

        {
          confirmedBookings.length > 0 && (
            <>
              <Heading title="Confirmados" />
              <section className="flex flex-col gap-3 mb-4">
                {
                  confirmedBookings.map((booking) => (
                    <BookingItem 
                      key={booking.id} 
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))
                }
              </section>
            </>
          )
        }

        {
          concludedBookings.length > 0 && (
            <>
              <Heading title="Realizados" />
              <section className="flex flex-col gap-3 mb-4">
                {
                  concludedBookings.map((booking) => (
                    <BookingItem 
                      key={booking.id} 
                      booking={JSON.parse(JSON.stringify(booking))}
                    />
                  ))
                }
              </section>
            </>
          )
        }
      </div>
    </>
  )
}