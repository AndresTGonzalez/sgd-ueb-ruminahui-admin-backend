/*
  Warnings:

  - Added the required column `exitHour` to the `Justification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Justification" ADD COLUMN     "exitHour" TEXT NOT NULL;
