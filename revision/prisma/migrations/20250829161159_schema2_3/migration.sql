/*
  Warnings:

  - Added the required column `status` to the `Revision` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revision" ADD COLUMN     "status" "Status" NOT NULL;

-- CreateTable
CREATE TABLE "RevisionSession" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "revisionid" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "RevisionSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevisionSession_id_key" ON "RevisionSession"("id");

-- AddForeignKey
ALTER TABLE "RevisionSession" ADD CONSTRAINT "RevisionSession_revisionid_fkey" FOREIGN KEY ("revisionid") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevisionSession" ADD CONSTRAINT "RevisionSession_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
