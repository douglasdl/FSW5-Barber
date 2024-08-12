import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import { BarbershopService } from "@prisma/client";

interface BarbershopProps {
  name: string
}

interface BookingSummaryProps {
  service: BarbershopService
  selectedDay: Date | undefined
  selectedTime: string | undefined
  barbershop: BarbershopProps
}

export function BookingSummary({ service, selectedDay, selectedTime, barbershop  }: BookingSummaryProps) {
  return (
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
  )
}