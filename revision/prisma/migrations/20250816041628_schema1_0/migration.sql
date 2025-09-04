-- CreateTable
CREATE TABLE "User" (
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
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "sessionsintervel" INTEGER[],
    "sessions" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "createdSession" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endSession" TIMESTAMP(3) NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "brif" TEXT NOT NULL,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revisionSession" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "revisonnumber" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "revisionid" TEXT NOT NULL,
    "reminderDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revisionSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Revision_id_key" ON "Revision"("id");

-- CreateIndex
CREATE UNIQUE INDEX "revisionSession_id_key" ON "revisionSession"("id");

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisionSession" ADD CONSTRAINT "revisionSession_revisionid_fkey" FOREIGN KEY ("revisionid") REFERENCES "Revision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revisionSession" ADD CONSTRAINT "revisionSession_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
