/*
  Warnings:

  - You are about to drop the column `sexId` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the `Sex` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Personal" DROP CONSTRAINT "Personal_sexId_fkey";

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "sexId",
ADD COLUMN     "genderId" INTEGER;

-- DropTable
DROP TABLE "Sex";

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
