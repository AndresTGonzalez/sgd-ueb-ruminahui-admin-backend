/*
  Warnings:

  - You are about to drop the `AssistanceEmployeeIdentificator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CampusEmployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssistanceEmployeeIdentificator" DROP CONSTRAINT "AssistanceEmployeeIdentificator_assistanceDispositiveId_fkey";

-- DropForeignKey
ALTER TABLE "AssistanceEmployeeIdentificator" DROP CONSTRAINT "AssistanceEmployeeIdentificator_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "CampusEmployee" DROP CONSTRAINT "CampusEmployee_campusId_fkey";

-- DropForeignKey
ALTER TABLE "CampusEmployee" DROP CONSTRAINT "CampusEmployee_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_functionId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_laboralRegimeId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_laboralRelationshipId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_maritalStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_sexId_fkey";

-- DropTable
DROP TABLE "AssistanceEmployeeIdentificator";

-- DropTable
DROP TABLE "CampusEmployee";

-- DropTable
DROP TABLE "Employee";

-- CreateTable
CREATE TABLE "Personal" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "identificationCard" TEXT NOT NULL,
    "names" TEXT NOT NULL,
    "lastNames" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "childrens" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "sexId" INTEGER NOT NULL,
    "maritalStatusId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "functionId" INTEGER NOT NULL,
    "laboralRegimeId" INTEGER,
    "laboralRelationshipId" INTEGER,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampusPersonal" (
    "id" SERIAL NOT NULL,
    "campusId" INTEGER NOT NULL,
    "PersonalId" INTEGER NOT NULL,

    CONSTRAINT "CampusPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistancePersonalIdentificator" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "PersonalId" INTEGER NOT NULL,
    "assistanceDispositiveId" INTEGER NOT NULL,

    CONSTRAINT "AssistancePersonalIdentificator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_uuid_key" ON "Personal"("uuid");

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_sexId_fkey" FOREIGN KEY ("sexId") REFERENCES "Sex"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_maritalStatusId_fkey" FOREIGN KEY ("maritalStatusId") REFERENCES "MaritalStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_functionId_fkey" FOREIGN KEY ("functionId") REFERENCES "Function"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_laboralRegimeId_fkey" FOREIGN KEY ("laboralRegimeId") REFERENCES "LaboralRegime"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_laboralRelationshipId_fkey" FOREIGN KEY ("laboralRelationshipId") REFERENCES "LaboralRelationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusPersonal" ADD CONSTRAINT "CampusPersonal_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusPersonal" ADD CONSTRAINT "CampusPersonal_PersonalId_fkey" FOREIGN KEY ("PersonalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistancePersonalIdentificator" ADD CONSTRAINT "AssistancePersonalIdentificator_PersonalId_fkey" FOREIGN KEY ("PersonalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistancePersonalIdentificator" ADD CONSTRAINT "AssistancePersonalIdentificator_assistanceDispositiveId_fkey" FOREIGN KEY ("assistanceDispositiveId") REFERENCES "AssistanceDispositive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
