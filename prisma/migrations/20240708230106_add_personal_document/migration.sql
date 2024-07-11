-- CreateTable
CREATE TABLE "PersonalFile" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "documentRoute" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,

    CONSTRAINT "PersonalFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalFile" ADD CONSTRAINT "PersonalFile_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
