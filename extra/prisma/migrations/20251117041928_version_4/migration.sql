-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('COMPLETED', 'PENDING', 'MISSED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Revision" (
    "id" TEXT NOT NULL,
    "sessinNumber" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "sessionsintervel" TIMESTAMP(3)[],
    "sessions" INTEGER NOT NULL,
    "days" TEXT[],
    "createdSession" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startSesion" TIMESTAMP(3) NOT NULL,
    "endSession" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "brif" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL,
    "score" INTEGER,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RevisionSession" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sessionNumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "revisionid" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."Status" NOT NULL,
    "answer" JSONB,

    CONSTRAINT "RevisionSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Revision_id_key" ON "public"."Revision"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RevisionSession_id_key" ON "public"."RevisionSession"("id");

-- AddForeignKey
ALTER TABLE "public"."Revision" ADD CONSTRAINT "Revision_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RevisionSession" ADD CONSTRAINT "RevisionSession_revisionid_fkey" FOREIGN KEY ("revisionid") REFERENCES "public"."Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RevisionSession" ADD CONSTRAINT "RevisionSession_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
