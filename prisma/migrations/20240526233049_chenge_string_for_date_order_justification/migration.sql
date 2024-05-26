/*
  Warnings:

  - You are about to drop the column `exitHour` on the `Justification` table. All the data in the column will be lost.
  - Changed the type of `applicationDate` on the `Justification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Justification" DROP COLUMN "exitHour",
DROP COLUMN "applicationDate",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL;
