"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "./ui/button"

interface ScrollButtonProps {
  direction?: "left" | "right"
  sessionId: string
  scrollAmount?: number
}

export function ScrollButton({ direction = "right", sessionId, scrollAmount = 237 }: ScrollButtonProps) {

  function scrollHorizontally() {
    document.getElementById(sessionId)?.scrollBy({
      left: direction === "right" ? scrollAmount : - scrollAmount,
      behavior: "smooth",
    });
  }

  const directionStyles = direction === "right" ? "lg:-right-8" : "lg:-left-8";

  return (
    <Button 
      className={`lg:absolute lg:z-50 lg:top-36 lg:rounded-full lg:w-16 lg:h-16 lg:p-0 ${directionStyles}`}
      variant="outline"
      onClick={() => scrollHorizontally()}
    >
      {
        direction === "right" ? (
          <ChevronRightIcon size={48} />
        ) : (
          <ChevronLeftIcon size={48} />
        )
      }
    </Button>
  )
}