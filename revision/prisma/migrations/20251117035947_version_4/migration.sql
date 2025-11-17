/*
  Warnings:

  - You are about to drop the column `time` on the `Revision` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `RevisionSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Revision" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "RevisionSession" DROP COLUMN "time";
