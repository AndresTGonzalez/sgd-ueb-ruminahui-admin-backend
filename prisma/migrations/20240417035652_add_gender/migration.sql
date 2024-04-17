/*
  Warnings:

  - Added the required column `genderId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "genderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
