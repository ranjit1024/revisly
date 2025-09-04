/*
  Warnings:

  - You are about to drop the column `brif` on the `Revision` table. All the data in the column will be lost.
  - You are about to drop the column `brif` on the `RevisionSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Revision" DROP COLUMN "brif";

-- AlterTable
ALTER TABLE "RevisionSession" DROP COLUMN "brif";
