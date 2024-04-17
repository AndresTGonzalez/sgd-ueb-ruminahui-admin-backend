-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "laboralRelationshipId" INTEGER;

-- CreateTable
CREATE TABLE "LaboralRelationship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LaboralRelationship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_laboralRelationshipId_fkey" FOREIGN KEY ("laboralRelationshipId") REFERENCES "LaboralRelationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;
