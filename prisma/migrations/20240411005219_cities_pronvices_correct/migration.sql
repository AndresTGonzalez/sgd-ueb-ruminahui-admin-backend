/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `City` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Province` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Province` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `provinceId` on the `City` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "City" DROP CONSTRAINT "City_provinceId_fkey";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "provinceId",
ADD COLUMN     "provinceId" INTEGER NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Province" DROP CONSTRAINT "Province_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Province_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
