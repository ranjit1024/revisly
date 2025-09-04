/*
  Warnings:

  - The `sessionsintervel` column on the `Revision` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `RevisionSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `startSesion` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RevisionSession" DROP CONSTRAINT "RevisionSession_email_fkey";

-- DropForeignKey
ALTER TABLE "RevisionSession" DROP CONSTRAINT "RevisionSession_revisionid_fkey";

-- AlterTable
ALTER TABLE "Revision" ADD COLUMN     "startSesion" TIMESTAMP(3) NOT NULL,
DROP COLUMN "sessionsintervel",
ADD COLUMN     "sessionsintervel" TIMESTAMP(3)[];

-- DropTable
DROP TABLE "RevisionSession";
