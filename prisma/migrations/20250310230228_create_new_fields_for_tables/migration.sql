/*
  Warnings:

  - Added the required column `active` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "active" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" TEXT NOT NULL;
