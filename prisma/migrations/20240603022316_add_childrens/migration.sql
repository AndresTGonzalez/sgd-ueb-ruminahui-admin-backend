/*
  Warnings:

  - You are about to drop the column `childrens` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `hasMinorChildren` on the `Personal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "childrens",
DROP COLUMN "hasMinorChildren";

-- CreateTable
CREATE TABLE "PersonalChildren" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "names" TEXT NOT NULL,
    "lastNames" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalChildren_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalChildren" ADD CONSTRAINT "PersonalChildren_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
