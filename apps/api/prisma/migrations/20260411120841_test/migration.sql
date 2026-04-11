/*
  Warnings:

  - Added the required column `authorId` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `techStack` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "techStack" TEXT NOT NULL;
