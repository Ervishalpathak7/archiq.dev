/*
  Warnings:

  - You are about to drop the column `authorId` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Design` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_authorId_fkey";

-- AlterTable
ALTER TABLE "Design" DROP COLUMN "authorId",
DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
