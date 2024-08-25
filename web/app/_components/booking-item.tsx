"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { BookingSummary } from "./booking-summary";
import { Phones } from "./phones";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogClose, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
import { BarbershopMap } from "./barbershop-map";

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
  isLargeScreen: boolean;
}

export function BookingItem({ booking, isLargeScreen }: BookingItemProps) {

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { service: {barbershop} } = booking 
  const isConfirmed = isFuture(booking.date)

  async function handleCancelBooking() {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  function handleSheetOpenChange(isOpen: boolean) {
    setIsSheetOpen(isOpen)
  }

  function showBookingDetailsOnBigScreens() {
    console.log("showBookingDetailsOnBigScreens")
  }

  if (isLargeScreen) {
    return (
      <Card className="min-w-[90%]" onClick={() => showBookingDetailsOnBigScreens()}>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
              {isConfirmed ? "Confirmado" : "Finalizado"}
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
    );
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
                {isConfirmed ? "Confirmado" : "Finalizado"}
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

        <BarbershopMap 
          name={barbershop.name}
          imageUrl={barbershop.imageUrl}
          address={barbershop.address}
        />

        <div>
          <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mt-3 mb-6">
            <BookingSummary 
              barbershop={barbershop}
              selectedDate={booking.date}
              service={booking.service}
            />
          </div>

          <Phones phones={barbershop.phones} />
        </div>

        <SheetFooter>
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button className="w-full" variant="outline">Voltar</Button>
            </SheetClose>
            {
              isConfirmed ? (
                <Dialog>
                  <DialogTrigger className="w-full">
                    <Button variant="destructive" className="w-full">
                      Cancelar Reserva
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>Cancelar Reserva</DialogTitle>
                      <DialogDescription>
                        Tem certeza que deseja cancelar esse agendamento?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose className="w-full">
                        <Button
                          variant="destructive"
                          onClick={handleCancelBooking}
                          className="w-full"
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button className="w-full" variant="default">Avaliar</Button>
              )
            }
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}