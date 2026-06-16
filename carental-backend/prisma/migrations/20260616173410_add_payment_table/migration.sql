/*
  Warnings:

  - You are about to drop the column `paymentType` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `razorpayOrderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `razorpaySignature` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Made the column `razorpayPaymentId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paymentType",
DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "razorpayOrderId" TEXT NOT NULL,
ADD COLUMN     "razorpaySignature" TEXT NOT NULL,
ALTER COLUMN "razorpayPaymentId" SET NOT NULL;
