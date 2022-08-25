/*
  Warnings:

  - You are about to drop the column `ipAdress` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "ipAdress",
ADD COLUMN     "ipAddress" DOUBLE PRECISION;
