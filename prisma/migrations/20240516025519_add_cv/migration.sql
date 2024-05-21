-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "hasMinorChildren" BOOLEAN;

-- CreateTable
CREATE TABLE "Justification" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "justificationData" TEXT NOT NULL,
    "justificationTypeId" INTEGER NOT NULL,

    CONSTRAINT "Justification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JustificationType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JustificationType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curriculum" (
    "id" SERIAL NOT NULL,
    "personalId" INTEGER NOT NULL,

    CONSTRAINT "Curriculum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" SERIAL NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "completitionYear" INTEGER NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" SERIAL NOT NULL,
    "curriculumId" INTEGER NOT NULL,
    "cetficate" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "completitionYear" INTEGER NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Justification" ADD CONSTRAINT "Justification_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Justification" ADD CONSTRAINT "Justification_justificationTypeId_fkey" FOREIGN KEY ("justificationTypeId") REFERENCES "JustificationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculum" ADD CONSTRAINT "Curriculum_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_curriculumId_fkey" FOREIGN KEY ("curriculumId") REFERENCES "Curriculum"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
