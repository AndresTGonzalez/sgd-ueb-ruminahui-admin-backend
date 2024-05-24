/*
  Warnings:

  - You are about to drop the column `cetficate` on the `Certification` table. All the data in the column will be lost.
  - Added the required column `certification` to the `Certification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Certification" DROP COLUMN "cetficate",
ADD COLUMN     "certification" TEXT NOT NULL;
