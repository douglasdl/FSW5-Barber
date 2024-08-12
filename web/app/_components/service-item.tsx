"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from 'date-fns/locale'
import { format, set, setHours, setMinutes } from "date-fns"
import { useState } from "react"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"


interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

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

export function ServiceItem({ service, barbershop }: ServiceItemProps) {

  const { data } = useSession()
  
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined)

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date);
  }
  
  function handleTimeSelect(time: string | undefined) {
    setSelectedTime(time);
  }

  async function handleCreateBooking() {
    try {
      if(!selectedDay || !selectedTime) return
  
      const hours = Number(selectedTime.split(":")[0])
      const minutes = Number(selectedTime.split(":")[1])
      const newDate = set(selectedDay, {
        hours: hours,
        minutes: minutes
      });
      
      createBooking({
        serviceId: service.id,
        userId: (data?.user as any).id,
        date: newDate
      })
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error);
      toast.error("Error ao criar reserva!")
    }
  }

  return (
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

        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
        
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {
                Intl.NumberFormat("pt-BR", {
                  style: 'currency',
                  currency: 'BRL'
                }).format(Number(service.price))
              }
            </p>

            <Sheet>
              <SheetTrigger>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>
                <div className="py-5 border-b border-solid">
                  <Calendar 
                    mode="single" 
                    locale={ptBR} 
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
                        TIME_LIST.map((time) => (
                          <Button 
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      }
                    </div>
                  )
                }

                {
                  selectedTime && selectedDay && (
                    <div className="py-5 px-4">
                      <Card>
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {
                                Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL"
                                }).format(Number(service.price))
                              }
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>

                        </CardContent>
                      </Card>
                    </div>
                  )
                }
                <SheetFooter className="mt-5 px-5">
                  <Button
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime}
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
    
  )
}