/*
  Warnings:

  - Added the required column `onTime` to the `Assistance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayOfWeek` to the `PersonalSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistance" ADD COLUMN     "onTime" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "PersonalSchedule" ADD COLUMN     "dayOfWeek" INTEGER NOT NULL;
