/*
  Warnings:

  - You are about to drop the column `ipAdress` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "ipAdress",
ADD COLUMN     "ipAddress" DOUBLE PRECISION;
