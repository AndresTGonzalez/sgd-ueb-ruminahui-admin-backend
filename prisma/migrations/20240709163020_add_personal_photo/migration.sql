-- CreateTable
CREATE TABLE "PersonalPhoto" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "photoRoute" TEXT NOT NULL,
    "photoName" TEXT NOT NULL,

    CONSTRAINT "PersonalPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonalPhoto_personalId_key" ON "PersonalPhoto"("personalId");

-- AddForeignKey
ALTER TABLE "PersonalPhoto" ADD CONSTRAINT "PersonalPhoto_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
