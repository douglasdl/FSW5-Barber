const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedAkiyaTable() {
  try {
    // Define an array of akiya objects to insert
    const akiyas = [
      {
        floorPlan: "2LDK",
        price: 30000000,
        salePrice: 28000000,
        city: "Tokyo",
        prefecture: "Tokyo",
        mainImage: "https://example.com/main-image-1.jpg",
        picture: ["https://example.com/picture-1-1.jpg", "https://example.com/picture-1-2.jpg"],
        landArea: 120,
        buildArea: 90,
        built: new Date('2020-01-15'),
        buildYear: 2020,
        vacantSince: 2021,
        garages: 1,
        rooms: 4,
        bedrooms: 2,
      },
      {
        floorPlan: "3DK",
        price: 25000000,
        salePrice: 24000000,
        city: "Osaka",
        prefecture: "Osaka",
        mainImage: "https://example.com/main-image-2.jpg",
        picture: ["https://example.com/picture-2-1.jpg", "https://example.com/picture-2-2.jpg"],
        landArea: 150,
        buildArea: 100,
        built: new Date('2018-06-30'),
        buildYear: 2018,
        vacantSince: 2022,
        garages: 2,
        rooms: 5,
        bedrooms: 3,
      },
      {
        floorPlan: "1K",
        price: 15000000,
        salePrice: 14000000,
        city: "Kyoto",
        prefecture: "Kyoto",
        mainImage: "https://example.com/main-image-3.jpg",
        picture: ["https://example.com/picture-3-1.jpg"],
        landArea: 80,
        buildArea: 50,
        built: new Date('2019-11-20'),
        buildYear: 2019,
        vacantSince: 2023,
        garages: 0,
        rooms: 2,
        bedrooms: 1,
      },
      // Add more akiya objects as needed
    ];

    // Insert each akiya object into the database
    for (const akiyaData of akiyas) {
      await prisma.akiya.create({
        data: akiyaData,
      });
    }

    console.log("Akiya table seeded successfully!");

  } catch (error) {
    console.error("Error seeding the akiya table:", error);
  } finally {
    // Close the database connection
    await prisma.$disconnect();
  }
}

seedAkiyaTable();