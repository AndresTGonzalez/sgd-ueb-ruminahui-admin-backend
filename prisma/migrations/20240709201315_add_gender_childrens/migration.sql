/*
  Warnings:

  - Added the required column `genderId` to the `PersonalChildren` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PersonalChildren" ADD COLUMN     "genderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PersonalChildren" ADD CONSTRAINT "PersonalChildren_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
