/*
  Warnings:

  - Added the required column `brif` to the `RevisionSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RevisionSession" ADD COLUMN     "brif" TEXT NOT NULL;
