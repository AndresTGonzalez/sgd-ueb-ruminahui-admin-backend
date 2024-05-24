-- AlterTable
ALTER TABLE "MedicalPersonalData" ALTER COLUMN "personalMedication" DROP NOT NULL,
ALTER COLUMN "personalDisease" DROP NOT NULL,
ALTER COLUMN "personalAllergy" DROP NOT NULL;
