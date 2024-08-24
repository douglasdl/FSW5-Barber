import { getServerSession } from "next-auth";
import { Header } from "../_components/header";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import { BookingItem } from "../_components/booking-item";
import { Heading } from "../_components/heading";
import { getConfirmedBookings } from "../_data/get-confirmed-bookings";
import { getConcludedBookings } from "../_data/get-concluded-bookings";
import { Card } from "../_components/ui/card";
import { BarbershopMap } from "../_components/barbershop-map";
import { Badge } from "../_components/ui/badge";
import { BookingSummary } from "../_components/booking-summary";
import { Phones } from "../_components/phones";
import { Button } from "../_components/ui/button";
import { now } from "next-auth/client/_utils";

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  if(!session?.user) {
    // TODO show login popup
    return notFound();
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  const isConfirmed = true;

  return (
    <>
      <Header hasSearchBar />

      <div className="flex p-5 lg:py-10 lg:px-64 lg:gap-10">
        <div className="flex w-full lg:w-1/2 lg:flex-col gap-5 lg:gap-1">
          <h1 className="text-xl font-bold mb-4 lg:mb-0 flex:mb-0">Agendamentos</h1>
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
                        isLargeScreen={true}
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
                        isLargeScreen={true}
                      />
                    ))
                  }
                </section>
              </>
            )
          }
        </div>
        <div className="lg:hidden w-full">
          <section className="flex flex-col gap-3">
            {
              confirmedBookings.concat(concludedBookings).map((booking) => (
                <BookingItem 
                  key={booking.id} 
                  booking={booking} 
                  isLargeScreen={false}
                />
              ))
            }
          </section>
        </div>

        <div className="hidden lg:flex w-1/2 lg:mt-[76px]">
          <Card className="w-full p-5" id="booking-details-large-screens">
            {
              confirmedBookings.length === 0 ? (
                <>
                  {/* Display booking details here for large screens */}
                  <h2 className="text-lg font-semibold mb-4">Detalhes da Reserva</h2>
                  {/* Example: Use a static message or fallback content */}
                  <p>Selecione um agendamento para ver os detalhes.</p>
                </>
              ) : (
                <>
                  <BarbershopMap 
                    name={confirmedBookings[0].service.barbershop.name}
                    imageUrl={confirmedBookings[0].service.barbershop.imageUrl}
                    address={confirmedBookings[0].service.barbershop.address}
                  />

                  <div className="border-b border-solid p-5 space-y-2 lg:hidden">
                    <Heading title="Sobre Nós" />
                    <p className="text-sm text-justify">{confirmedBookings[0].service.barbershop.description}</p>
                  </div>

                  <div>
                    <Phones phones={confirmedBookings[0].service.barbershop.phones} />
                    
                    <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
                      {isConfirmed ? "Confirmado" : "Realizado"}
                    </Badge>

                    <div className="mt-3 mb-6">
                      <BookingSummary 
                        barbershop={confirmedBookings[0].service.barbershop}
                        selectedDate={confirmedBookings[0].date}
                        service={confirmedBookings[0].service}
                      />
                    </div>

                    {
                      concludedBookings[0].date > new Date(now()) && (
                        <Button variant="destructive" className="w-full">
                          Cancelar Reserva
                        </Button>
                      )
                    }


                  </div>
                </>

              )
            }
          </Card>
        </div>
      </div>
    </>
  )
}