-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_reference_key" ON "Payment"("reference");
