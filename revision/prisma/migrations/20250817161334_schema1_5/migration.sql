/*
  Warnings:

  - Added the required column `brif` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revision" ADD COLUMN     "brif" TEXT NOT NULL;
