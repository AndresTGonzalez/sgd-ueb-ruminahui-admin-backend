/*
  Warnings:

  - You are about to drop the column `date` on the `Justification` table. All the data in the column will be lost.
  - You are about to drop the column `justificationData` on the `Justification` table. All the data in the column will be lost.
  - You are about to drop the column `file` on the `JustificationFile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `JustificationType` table. All the data in the column will be lost.
  - Added the required column `affair` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationDate` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exitHour` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraInfo` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromDate` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnHour` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `Justification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentRout` to the `JustificationFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `JustificationType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Justification" DROP COLUMN "date",
DROP COLUMN "justificationData",
ADD COLUMN     "affair" TEXT NOT NULL,
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "exitHour" TEXT NOT NULL,
ADD COLUMN     "extraInfo" TEXT NOT NULL,
ADD COLUMN     "fromDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "returnHour" TEXT NOT NULL,
ADD COLUMN     "toDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JustificationFile" DROP COLUMN "file",
ADD COLUMN     "documentRout" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "JustificationType" DROP COLUMN "name",
ADD COLUMN     "type" TEXT NOT NULL;
