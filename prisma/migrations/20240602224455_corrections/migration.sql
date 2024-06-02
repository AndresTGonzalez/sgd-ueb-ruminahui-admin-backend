/*
  Warnings:

  - You are about to drop the column `documentRout` on the `JustificationFile` table. All the data in the column will be lost.
  - Added the required column `documentRoute` to the `JustificationFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JustificationFile" DROP COLUMN "documentRout",
ADD COLUMN     "documentRoute" TEXT NOT NULL;
