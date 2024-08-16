"use server"

import { db } from "../_lib/prisma"

export async function getMostVisitedBarbershops() {
  return db.barbershop.findMany({
    orderBy: {
      name: "asc"
    }
  });
}