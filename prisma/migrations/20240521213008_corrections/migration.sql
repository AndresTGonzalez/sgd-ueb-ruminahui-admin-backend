/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `functionId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `journalId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `laboralRegimeId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `laboralRelationshipId` on the `Personal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CampusPersonal" DROP CONSTRAINT "CampusPersonal_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_functionId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_journalId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_laboralRegimeId_fkey";

-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_laboralRelationshipId_fkey";

-- AlterTable
ALTER TABLE "CampusPersonal" ADD COLUMN     "institutionalPersonalDataId" INTEGER;

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "categoryId",
DROP COLUMN "functionId",
DROP COLUMN "journalId",
DROP COLUMN "laboralRegimeId",
DROP COLUMN "laboralRelationshipId";

-- CreateTable
CREATE TABLE "InstitutionalPersonalData" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "categoryId" INTEGER,
    "functionId" INTEGER,
    "laboralRegimeId" INTEGER,
    "laboralRelationshipId" INTEGER,
    "journalId" INTEGER,

    CONSTRAINT "InstitutionalPersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalPersonalData" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER,
    "personalMedication" TEXT NOT NULL,
    "personalDisease" TEXT NOT NULL,
    "personalAllergy" TEXT NOT NULL,

    CONSTRAINT "MedicalPersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "medicalPersonalDataId" INTEGER NOT NULL,

    CONSTRAINT "BloodType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "Function"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_laboralRegimeId_fkey" FOREIGN KEY ("laboralRegimeId") REFERENCES "LaboralRegime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_laboralRelationshipId_fkey" FOREIGN KEY ("laboralRelationshipId") REFERENCES "LaboralRelationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionalPersonalData" ADD CONSTRAINT "InstitutionalPersonalData_journalId_fkey" FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalPersonalData" ADD CONSTRAINT "MedicalPersonalData_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodType" ADD CONSTRAINT "BloodType_medicalPersonalDataId_fkey" FOREIGN KEY ("medicalPersonalDataId") REFERENCES "MedicalPersonalData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusPersonal" ADD CONSTRAINT "CampusPersonal_institutionalPersonalDataId_fkey" FOREIGN KEY ("institutionalPersonalDataId") REFERENCES "InstitutionalPersonalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
