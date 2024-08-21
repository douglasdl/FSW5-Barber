import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";

interface BarbershopMapProps {
  name: string
  imageUrl: string
  address: string
}

export function BarbershopMap({ name, imageUrl, address }: BarbershopMapProps) {
  return (
    <div className="relative h-[180px] w-full flex items-end">
      <Image 
        src="/map.png" 
        alt={`Mapa da barbearia ${name}`} 
        fill 
        className="object-cover rounded-xl" 
      />

      <Card className="z-50 w-full mb-3 mx-5 rounded-xl">
        <CardContent className="px-5 py-3 flex items-center gap-3">
          <Avatar>
            <AvatarImage src={imageUrl} />
          </Avatar>

          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-xs">{address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}