/*
  Warnings:

  - You are about to drop the column `date` on the `Assistance` table. All the data in the column will be lost.
  - Added the required column `clockCheck` to the `Assistance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assistance" DROP COLUMN "date",
ADD COLUMN     "clockCheck" TIMESTAMP(3) NOT NULL;
