/*
  Warnings:

  - You are about to drop the column `PersonalId` on the `CampusPersonal` table. All the data in the column will be lost.
  - Added the required column `personalId` to the `CampusPersonal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CampusPersonal" DROP CONSTRAINT "CampusPersonal_PersonalId_fkey";

-- AlterTable
ALTER TABLE "CampusPersonal" DROP COLUMN "PersonalId",
ADD COLUMN     "personalId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PersonalSchedule" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampusPersonal" ADD CONSTRAINT "CampusPersonal_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalSchedule" ADD CONSTRAINT "PersonalSchedule_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
