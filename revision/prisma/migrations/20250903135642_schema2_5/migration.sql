/*
  Warnings:

  - Added the required column `score` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revision" ADD COLUMN     "score" INTEGER NOT NULL;
