/*
  Warnings:

  - Added the required column `documentName` to the `JustificationFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JustificationFile" ADD COLUMN     "documentName" TEXT NOT NULL;
