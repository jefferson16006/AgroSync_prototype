-- CreateEnum
CREATE TYPE "Categories" AS ENUM ('CROPS', 'LIVESTOCK', 'PRODUCE', 'OTHER');

-- CreateTable
CREATE TABLE "Listings" (
    "listindId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" "Categories" NOT NULL DEFAULT 'CROPS',
    "location" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Listings_pkey" PRIMARY KEY ("listindId")
);

-- AddForeignKey
ALTER TABLE "Listings" ADD CONSTRAINT "Listings_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
