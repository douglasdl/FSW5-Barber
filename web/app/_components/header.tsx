import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

export function Header () {
  return (
    <Card>
      <CardContent className="justify-between flex flex-row items-center p-5">
        <Image src="/logo.svg" height={18} width={120} alt="Logo" />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}