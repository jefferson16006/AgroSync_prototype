-- CreateEnum
CREATE TYPE "HealthStatus" AS ENUM ('GOOD', 'DISEASED', 'BAD');

-- CreateEnum
CREATE TYPE "SpoilageRisk" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "CropScans" (
    "cropScanId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "healthStatus" "HealthStatus" NOT NULL,
    "spoilageRisk" "SpoilageRisk" NOT NULL,
    "confidenceScore" INTEGER NOT NULL,
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CropScans_pkey" PRIMARY KEY ("cropScanId")
);

-- AddForeignKey
ALTER TABLE "CropScans" ADD CONSTRAINT "CropScans_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
