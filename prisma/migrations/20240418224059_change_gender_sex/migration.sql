/*
  Warnings:

  - You are about to drop the column `genderId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Gender` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sexId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_genderId_fkey";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "genderId",
ADD COLUMN     "sexId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Gender";

-- CreateTable
CREATE TABLE "Sex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sex_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "Sex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
