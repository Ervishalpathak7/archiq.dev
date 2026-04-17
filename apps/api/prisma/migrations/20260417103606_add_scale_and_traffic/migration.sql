/*
  Warnings:

  - Added the required column `scale` to the `Design` table without a default value. This is not possible if the table is not empty.
  - Added the required column `traffic` to the `Design` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Design" ADD COLUMN     "scale" TEXT NOT NULL,
ADD COLUMN     "traffic" TEXT NOT NULL;
