/*
  Warnings:

  - You are about to drop the column `eachOtherFollow` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "eachOtherFollow",
ADD COLUMN     "followed" TEXT[];
