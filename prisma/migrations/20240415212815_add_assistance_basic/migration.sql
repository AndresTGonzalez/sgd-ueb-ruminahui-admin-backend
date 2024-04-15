-- CreateTable
CREATE TABLE "Campus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistanceDispositive" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "campusId" INTEGER NOT NULL,
    "serial" TEXT NOT NULL,

    CONSTRAINT "AssistanceDispositive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistanceEmployeeIdentificator" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "assistanceDispositiveId" INTEGER NOT NULL,

    CONSTRAINT "AssistanceEmployeeIdentificator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistanceDispositive_serial_key" ON "AssistanceDispositive"("serial");

-- AddForeignKey
ALTER TABLE "AssistanceDispositive" ADD CONSTRAINT "AssistanceDispositive_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistanceEmployeeIdentificator" ADD CONSTRAINT "AssistanceEmployeeIdentificator_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssistanceEmployeeIdentificator" ADD CONSTRAINT "AssistanceEmployeeIdentificator_assistanceDispositiveId_fkey" FOREIGN KEY ("assistanceDispositiveId") REFERENCES "AssistanceDispositive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
