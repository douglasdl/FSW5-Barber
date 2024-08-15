"use server"

import { db } from "../_lib/prisma"

export async function getPopularBarbershops() {
  return db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  });
}