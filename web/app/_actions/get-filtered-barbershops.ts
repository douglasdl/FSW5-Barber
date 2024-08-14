"use server"

import { db } from "../_lib/prisma"

interface GetFilteredBarbershopsProps {
  searchParams: {
    title?: string,
    service?: string
  }
}

export async function getFilteredBarbershops({ searchParams }: GetFilteredBarbershopsProps) {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams?.title 
        ?
        {
          name: {
            contains: searchParams?.title,
            mode: "insensitive"
          }
        } : {},
        searchParams?.service
        ?
        {
          services: {
            some: {
              name: {
                contains: searchParams?.service,
                mode: "insensitive"
              }
            }
          }
        } : {}
      ]
    }
  })
}