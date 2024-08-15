import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRoundIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { SidebarSheet } from "./sidebar-sheet";
import Link from "next/link";

export function Header () {
  return (
    <Card className="rounded-none border-t-0 border-r-0 border-l-0 lg:px-32">
      <CardContent className="justify-between flex flex-row items-center p-5">
        <Link href="/">
          <Image src="/logo.svg" height={18} width={120} alt="Logo" />
        </Link>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SidebarSheet />
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:gap-6">
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href={`/bookings`}>
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </Button>

          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <CircleUserRoundIcon size={18} />
              Perfil
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}