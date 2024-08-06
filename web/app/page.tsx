"use client"

import { SearchIcon } from "lucide-react";
import { Header } from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";

const name = 'test'


export default function Home() {
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
      </div>
    </div>
  );
}