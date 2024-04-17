/*
  Warnings:

  - Added the required column `functionId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "functionId" INTEGER NOT NULL,
ADD COLUMN     "laboralRegimeId" INTEGER;

-- CreateTable
CREATE TABLE "Function" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Function_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaboralRegime" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LaboralRegime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "Function"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_laboralRegimeId_fkey" FOREIGN KEY ("laboralRegimeId") REFERENCES "LaboralRegime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
