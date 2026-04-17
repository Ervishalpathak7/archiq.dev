/*
  Warnings:

  - Added the required column `userPrompt` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userPrompt" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
