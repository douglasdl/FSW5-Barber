"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from 'date-fns/locale'
import { addDays, isPast, isToday, set } from "date-fns"
import { useEffect, useMemo, useState } from "react"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookings } from "../_data/get-bookings"
import { Dialog, DialogContent } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import { BookingSummary } from "./booking-summary"
import { useRouter } from "next/navigation"

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

function getTimeList({ bookings, selectedDay}: GetTimeListProps) {
  return TIME_LIST.filter((time) => {
    const hours = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const timeIsOnThePast = isPast(set(new Date(), {hours, minutes}));
    if(timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) => 
        booking.date.getHours() === hours && 
        booking.date.getMinutes() === minutes
    )
    
    if(hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {

  const { data } = useSession()
  const router = useRouter()

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date);
  }
  
  function handleTimeSelect(time: string | undefined) {
    setSelectedTime(time);
  }

  function handleBookingClick() {
    if(data?.user) {
      return setBookingSheetIsOpen(true)
    }
    return setSignInDialogIsOpen(true)
  }

  async function handleCreateBooking() {
    try {
      if(!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate
      })
      handleBookingSheetOpenChange();
      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push('/bookings')
        }
      })
    } catch (error) {
      console.error(error);
      toast.error("Error ao criar reserva!")
    }
  }

  function handleBookingSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen(false)
  }

  const timeList = useMemo(() => {
    if(!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay
    })
  }, [dayBookings, selectedDay])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime?.split(":")[0]),
      minutes: Number(selectedTime?.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    console.log("useEffect")
    fetch()
  }, [selectedDay, service.id])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
            <Image 
              src={service.imageUrl} 
              fill 
              className="object-cover rounded-xl" 
              alt={service.name} 
            />
          </div>

          <div className="space-y-2 w-full">
            <h3 className="font-semibold text-sm">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
          
            <div className="flex items-center justify-between w-full">
              <p className="text-sm font-bold text-primary w-full">
                {
                  Intl.NumberFormat("ja-JP", {
                    style: 'currency',
                    currency: 'JPY'
                  }).format(Number(service.price))
                }
              </p>

              <Sheet open={bookingSheetIsOpen} onOpenChange={handleBookingSheetOpenChange}>
                
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={handleBookingClick}
                  >
                    Reservar
                  </Button>
                
                <SheetContent className="px-0">
                  <SheetHeader className="lg:border-b lg:border-solid lg:flex lg:flex-row lg:pb-5">
                    <SheetTitle className="px-5 lg:py-5">Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-5 border-b border-solid">
                    <Calendar 
                      mode="single" 
                      locale={ptBR} 
                      fromDate={addDays(new Date(), 0)}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {
                    selectedDay && (
                      <div className="p-5 gap-3 flex overflow-x-auto [&::-webkit-scrollbar]:hidden border-b border-solid">
                        {
                          timeList.length > 0 ? timeList.map((time) => (
                            <Button 
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              className="rounded-full"
                              onClick={() => handleTimeSelect(time)}
                            >
                              {time}
                            </Button>
                          )) : (
                            <p className="text-xs">
                              Não há horários disponíveis para este dia!
                            </p>
                          )
                        }
                      </div>
                    )
                  }

                  {
                    selectedDate && (
                      <div className="py-5 px-4">
                        <BookingSummary 
                          barbershop={barbershop}
                          selectedDate={selectedDate}
                          service={service}
                        />
                      </div>
                    )
                  }
                  <SheetFooter className="mt-5 px-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                      className="lg:w-full"
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
    
  )
}