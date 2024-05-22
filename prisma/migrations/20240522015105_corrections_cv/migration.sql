/*
  Warnings:

  - You are about to drop the column `medicalPersonalDataId` on the `BloodType` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Certification` table. All the data in the column will be lost.
  - You are about to drop the column `personalId` on the `MedicalPersonalData` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Title` table. All the data in the column will be lost.
  - You are about to drop the `Curriculum` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `personalId` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalId` to the `Title` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BloodType" DROP CONSTRAINT "BloodType_medicalPersonalDataId_fkey";

-- DropForeignKey
ALTER TABLE "Certification" DROP CONSTRAINT "Certification_curriculumId_fkey";

-- DropForeignKey
ALTER TABLE "Curriculum" DROP CONSTRAINT "Curriculum_personalId_fkey";

-- DropForeignKey
ALTER TABLE "MedicalPersonalData" DROP CONSTRAINT "MedicalPersonalData_personalId_fkey";

-- DropForeignKey
ALTER TABLE "Title" DROP CONSTRAINT "Title_curriculumId_fkey";

-- AlterTable
ALTER TABLE "BloodType" DROP COLUMN "medicalPersonalDataId";

-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "curriculumId",
ADD COLUMN     "personalId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MedicalPersonalData" DROP COLUMN "personalId",
ADD COLUMN     "bloodTypeId" INTEGER;

-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "medicalPersonalDataId" INTEGER;

-- AlterTable
ALTER TABLE "Title" DROP COLUMN "curriculumId",
ADD COLUMN     "personalId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Curriculum";

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_medicalPersonalDataId_fkey" FOREIGN KEY ("medicalPersonalDataId") REFERENCES "MedicalPersonalData"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalPersonalData" ADD CONSTRAINT "MedicalPersonalData_bloodTypeId_fkey" FOREIGN KEY ("bloodTypeId") REFERENCES "BloodType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
