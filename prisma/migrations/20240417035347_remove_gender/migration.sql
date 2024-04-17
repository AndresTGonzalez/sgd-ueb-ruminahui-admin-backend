/*
  Warnings:

  - You are about to drop the column `genderId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_genderId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "genderId";

-- DropTable
DROP TABLE "Gender";
