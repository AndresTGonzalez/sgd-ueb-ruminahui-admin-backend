-- CreateTable
CREATE TABLE "CampusEmployee" (
    "id" SERIAL NOT NULL,
    "campusId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "CampusEmployee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CampusEmployee" ADD CONSTRAINT "CampusEmployee_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampusEmployee" ADD CONSTRAINT "CampusEmployee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
