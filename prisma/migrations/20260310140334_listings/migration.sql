/*
  Warnings:

  - The primary key for the `Listings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `listindId` on the `Listings` table. All the data in the column will be lost.
  - The required column `listingId` was added to the `Listings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Listings" DROP CONSTRAINT "Listings_pkey",
DROP COLUMN "listindId",
ADD COLUMN     "listingId" TEXT NOT NULL,
ADD CONSTRAINT "Listings_pkey" PRIMARY KEY ("listingId");
