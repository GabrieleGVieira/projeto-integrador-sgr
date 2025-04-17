/*
  Warnings:

  - Made the column `active` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "active" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "active" BOOLEAN NOT NULL DEFAULT true;
