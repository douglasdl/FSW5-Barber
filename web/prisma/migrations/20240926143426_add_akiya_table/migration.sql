-- CreateTable
CREATE TABLE "Akiya" (
    "id" TEXT NOT NULL,
    "floorPlan" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "salePrice" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "prefecture" TEXT NOT NULL,
    "mainImage" TEXT NOT NULL,
    "picture" TEXT[],
    "landArea" INTEGER NOT NULL,
    "buildArea" INTEGER NOT NULL,
    "built" TIMESTAMP(3) NOT NULL,
    "buildYear" INTEGER NOT NULL,
    "vacantSince" INTEGER NOT NULL,
    "garages" INTEGER NOT NULL,
    "rooms" INTEGER NOT NULL,
    "bedrooms" INTEGER NOT NULL,

    CONSTRAINT "Akiya_pkey" PRIMARY KEY ("id")
);
