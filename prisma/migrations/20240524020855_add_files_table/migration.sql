-- CreateTable
CREATE TABLE "JustificationFile" (
    "id" SERIAL NOT NULL,
    "justificationId" INTEGER NOT NULL,
    "file" TEXT NOT NULL,

    CONSTRAINT "JustificationFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JustificationFile" ADD CONSTRAINT "JustificationFile_justificationId_fkey" FOREIGN KEY ("justificationId") REFERENCES "Justification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
