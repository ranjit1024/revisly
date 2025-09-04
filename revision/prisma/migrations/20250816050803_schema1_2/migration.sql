/*
  Warnings:

  - You are about to drop the column `revisonnumber` on the `RevisionSession` table. All the data in the column will be lost.
  - Added the required column `sessionNumber` to the `RevisionSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `RevisionSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "RevisionSession" DROP COLUMN "revisonnumber",
ADD COLUMN     "sessionNumber" INTEGER NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL;
