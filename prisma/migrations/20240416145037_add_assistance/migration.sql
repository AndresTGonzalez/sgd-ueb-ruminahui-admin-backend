/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `AssistanceEmployeeIdentificator` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Assistance" (
    "id" SERIAL NOT NULL,
    "check" TIMESTAMP(3) NOT NULL,
    "assistanceEmployeeIdentificatorId" INTEGER NOT NULL,

    CONSTRAINT "Assistance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistanceEmployeeIdentificator_code_key" ON "AssistanceEmployeeIdentificator"("code");

-- AddForeignKey
ALTER TABLE "Assistance" ADD CONSTRAINT "Assistance_assistanceEmployeeIdentificatorId_fkey" FOREIGN KEY ("assistanceEmployeeIdentificatorId") REFERENCES "AssistanceEmployeeIdentificator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
