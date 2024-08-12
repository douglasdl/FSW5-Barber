import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

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
  return (
    <>
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
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
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">06</p>
            <p className="text-sm">09:45</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}