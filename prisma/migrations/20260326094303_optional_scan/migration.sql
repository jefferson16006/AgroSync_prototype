-- DropForeignKey
ALTER TABLE "Listings" DROP CONSTRAINT "Listings_scanId_fkey";

-- AlterTable
ALTER TABLE "Listings" ALTER COLUMN "scanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Listings" ADD CONSTRAINT "Listings_scanId_fkey" FOREIGN KEY ("scanId") REFERENCES "CropScans"("cropScanId") ON DELETE SET NULL ON UPDATE CASCADE;
