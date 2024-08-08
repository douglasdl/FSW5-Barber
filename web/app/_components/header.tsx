import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { SidebarSheet } from "./sidebar-sheet";

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
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}