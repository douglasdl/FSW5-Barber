import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <Card className="min-w-[159px] lg:min-w-[221px] rounded-2xl">
      <CardContent className="pb-0 px-1 pt-1">
        <div className="relative h-[159px] w-full p-4">
          <Image src={barbershop.imageUrl} alt={barbershop.name} fill className="object-cover rounded-2xl" />

          <Badge className="absolute top-2 left-2 gap-1 bg-primary/30" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5.0</p>
          </Badge>
        </div>
        <div className="p-3">
          <h3 className="font-semibold truncate lg:text-base">{barbershop.name}</h3>
          <p className="text-sm lg:text-xs text-gray-400 truncate lg:whitespace-normal lg:overflow-visible lg:h-8">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>
              Reservar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}