"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { quickSearchOptions } from "../_constants/search";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";

export function SidebarSheet() {

  const { data } = useSession();

  async function handleLoginWithGoogleClick() {
    await signIn("google")
  }

  function handleLogoutClick() {
    signOut()
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 py-5 border-b border-solid">
        
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
          <>
            <h2 className="font-bold">Olá. Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>

                <Button variant="outline" className="gap-2 font-bold" onClick={handleLoginWithGoogleClick}>
                  <Image src="/google.svg" width={18} height={18} alt="Fazer login com Google" />
                  Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )
      }

        
       
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
        <Button className="justify-start gap-2" variant="ghost" onClick={handleLogoutClick}>
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}