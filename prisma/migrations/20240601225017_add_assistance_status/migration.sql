/*
  Warnings:

  - You are about to drop the column `onTime` on the `Assistance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Assistance" DROP COLUMN "onTime",
ADD COLUMN     "assistanceStatusId" INTEGER;

-- CreateTable
CREATE TABLE "AssistanceStatus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssistanceStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assistance" ADD CONSTRAINT "Assistance_assistanceStatusId_fkey" FOREIGN KEY ("assistanceStatusId") REFERENCES "AssistanceStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
