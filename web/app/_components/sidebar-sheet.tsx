import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { quickSearchOptions } from "../_constants/search";

export function SidebarSheet() {
  return (
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
  )
}