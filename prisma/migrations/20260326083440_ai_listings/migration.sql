/*
  Warnings:

  - A unique constraint covering the columns `[scanId]` on the table `Listings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `scanId` to the `Listings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Listings" ADD COLUMN     "scanId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Listings_scanId_key" ON "Listings"("scanId");

-- AddForeignKey
ALTER TABLE "Listings" ADD CONSTRAINT "Listings_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "CropScans"("cropScanId") ON DELETE RESTRICT ON UPDATE CASCADE;
