"use server"

import { db } from "../_lib/prisma"

export async function getBarbershops() {
  return db.barbershop.findMany({});
}