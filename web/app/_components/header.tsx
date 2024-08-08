import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export function Header () {
  return (
    <Card className="rounded-none border-t-0 border-r-0 border-l-0">
      <CardContent className="justify-between flex flex-row items-center p-5">
        <Image src="/logo.svg" height={18} width={120} alt="Logo" />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-4 py-5 border-b border-solid">
              <Avatar>
                <AvatarImage src="http://www.github.com/douglasdl.png" />
              </Avatar>

              <div>
                <p className="font-bold">Douglas Dias Leal</p>
                <p className="text-gray-500 text-sm">douglas_san@hotmail.com</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-5 border-b border-solid">
              <SheetClose asChild>
                <Button className="justify-start gap-2" asChild>
                  <Link href="/">
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>

              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-4 p-5 border-b border-solid">
              {
                quickSearchOptions.map((option) => (
                  <Button key={option.title} className="justify-start gap-2" variant="ghost">
                    <Image src={option.imageUrl} alt={option.title} width={18} height={18} />
                    {option.title}
                  </Button>
                ))
              }
            </div>

            <div className="flex flex-col gap-4 p-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}