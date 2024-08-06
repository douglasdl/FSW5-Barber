import { SearchIcon } from "lucide-react";
import { Header } from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./_components/ui/avatar";
import { BarbershopItem } from "./_components/barbershop-item";
import { db } from "./_lib/prisma";
import { Footer } from "./_components/footer";

export default async function Home() {

  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  });

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Douglas!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Buscar" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image src="/banner-01.png" alt="Banner" fill className="object-cover rounded-xl" />
        </div>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Agendamentos</h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-3 px-9 border-l-2 border-solid">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">06</p>
              <p className="text-sm">09:45</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {
            barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))
          }
        </div>
        
        <h2 className="uppercase text-xs font-bold text-gray-400 mt-6 mb-3">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {
            popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}