/*
  Warnings:

  - You are about to drop the `revisionSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "revisionSession" DROP CONSTRAINT "revisionSession_email_fkey";

-- DropForeignKey
ALTER TABLE "revisionSession" DROP CONSTRAINT "revisionSession_revisionid_fkey";

-- DropTable
DROP TABLE "revisionSession";

-- CreateTable
CREATE TABLE "RevisionSession" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "revisonnumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "revisionid" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RevisionSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevisionSession_id_key" ON "RevisionSession"("id");

-- AddForeignKey
ALTER TABLE "RevisionSession" ADD CONSTRAINT "RevisionSession_revisionid_fkey" FOREIGN KEY ("revisionid") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionSession" ADD CONSTRAINT "RevisionSession_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
