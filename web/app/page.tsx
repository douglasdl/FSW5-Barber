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
      <div className="flex flex-col p-5 gap-6">
        <h2 className="text-xl font-bold">Olá, Douglas!</h2>
        <p>Segunda-feira, 05 de agosto</p>

        <div className="flex items-center gap-2">
          <Input placeholder="Buscar" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            <Image src="/hair-cut.svg" alt="Cabelo" width={16} height={16} />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/beard.svg" alt="Barba" width={16} height={16} />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/finish.svg" alt="Acabamento" width={16} height={16} />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/eyebrow.svg" alt="Sobrancelha" width={16} height={16} />
            Sobrancelha
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/massage.svg" alt="Massagem" width={16} height={16} />
            Massagem
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/hair-hydration.svg" alt="Hidratação" width={16} height={16} />
            Hidratação
          </Button>
        </div>

        <div className="relative w-full h-[150px]">
          <Image src="/banner-01.png" alt="Banner" fill className="object-cover rounded-xl" />
        </div>

        <section>
          <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">Agendamentos</h2>
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
        </section>

        <section>
          <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">Recomendados</h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>
        </section>
        
        <section>
          <h2 className="uppercase text-xs font-bold text-gray-400 mb-3">Populares</h2>
          <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
            {
              popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))
            }
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}