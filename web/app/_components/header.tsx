"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRoundIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { SidebarSheet } from "./sidebar-sheet";
import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";

export function Header () {

  const { data } = useSession();

  return (
    <Card className="rounded-none border-t-0 border-r-0 border-l-0 lg:px-32">
      <CardContent className="justify-between flex flex-row items-center p-5 lg:px-0">
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

          {
            data?.user ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""} />
                </Avatar>

                <div>
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-gray-500 text-sm">{data.user.email}</p>
                </div>
              </div>
            ) : (
              <Button className="justify-start gap-2" asChild>
                <Link href="/">
                  <CircleUserRoundIcon size={18} />
                  Perfil
                </Link>
              </Button>
            )
          }
        </div>
      </CardContent>
    </Card>
  )
}