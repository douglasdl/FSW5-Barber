import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { BookingSummary } from "./booking-summary";
import { PhoneItem } from "./phone-item";
import { Phones } from "./phones";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {

  const { service: {barbershop} } = booking 
  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
                {isConfirmed ? "Confirmado" : "Realizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.imageUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-3 px-9 border-l-2 border-solid">
              <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
              <p className="text-2xl">{format(booking.date, "dd", { locale: ptBR })}</p>
              <p className="text-sm">{format(booking.date, "hh:mm", { locale: ptBR })}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-[90%] gap-6">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full flex items-end">
          <Image 
            src="/map.png" 
            alt={`Mapa da barbearia ${barbershop.name}`} 
            fill 
            className="object-cover rounded-xl" 
          />

          <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
            <CardContent className="px-5 py-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
            {isConfirmed ? "Confirmado" : "Realizado"}
          </Badge>

          <div className="mt-3 mb-6">
            <BookingSummary 
              barbershop={barbershop}
              selectedDay={booking.date}
              selectedTime={format(booking.date, "hh:mm", { locale: ptBR })}
              service={booking.service}
            />
          </div>

          <Phones phones={barbershop.phones} />
        </div>
      </SheetContent>
    </Sheet>
  )
}