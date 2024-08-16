import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { quickSearchOptions } from "../_constants/search";

export function QuickSearchButtons() {
  return (
    <div className="flex lg:hidden gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {
        quickSearchOptions.map(option => (
          <Button className="gap-2" variant="secondary" key={option.title} asChild>
            <Link href={`/barbershops?service=${option.title}`}>
              <Image src={option.imageUrl} alt={option.title} width={16} height={16} />
              {option.title}
            </Link>
          </Button>
        ))
      }
    </div>
  )
}