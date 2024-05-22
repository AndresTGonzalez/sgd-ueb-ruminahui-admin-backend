/*
  Warnings:

  - Added the required column `personalId` to the `MedicalPersonalData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_medicalPersonalDataId_fkey";

-- AlterTable
ALTER TABLE "MedicalPersonalData" ADD COLUMN     "personalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalPersonalData" ADD CONSTRAINT "MedicalPersonalData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
