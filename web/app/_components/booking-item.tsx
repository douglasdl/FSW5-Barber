import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingItem() {
  return (
    <>
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
    </>
  )
}