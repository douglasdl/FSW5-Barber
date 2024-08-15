"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopProps {
  params: {
    id: string
  }
}

export async function getBarbershop({params}: GetBarbershopProps) {
  return db.barbershop.findUnique({
    where: {
      id: params.id
    },
    include: {
      services: true
    }
  })
}