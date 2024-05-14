/*
  Warnings:

  - You are about to drop the column `PersonalId` on the `AssistancePersonalIdentificator` table. All the data in the column will be lost.
  - Added the required column `personalId` to the `AssistancePersonalIdentificator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AssistancePersonalIdentificator" DROP CONSTRAINT "AssistancePersonalIdentificator_PersonalId_fkey";

-- AlterTable
ALTER TABLE "AssistancePersonalIdentificator" DROP COLUMN "PersonalId",
ADD COLUMN     "personalId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AssistancePersonalIdentificator" ADD CONSTRAINT "AssistancePersonalIdentificator_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
