import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface BarbershopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <Card className="min-w-[159px] rounded-2xl">
      <CardContent className="pb-0 px-1 pt-1">
        <div className="relative h-[159px] w-full p-4">
          <Image src={barbershop.imageUrl} alt={barbershop.name} fill className="object-cover rounded-2xl" />

          <Badge className="absolute top-2 left-2 gap-1 bg-primary/30" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>
        <div className="p-3">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  )
}