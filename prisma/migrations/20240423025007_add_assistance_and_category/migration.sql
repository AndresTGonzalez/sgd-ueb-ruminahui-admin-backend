-- AlterTable
ALTER TABLE "Personal" ADD COLUMN     "categoryId" INTEGER;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assistance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "assistancePersonalIdentificatorId" INTEGER NOT NULL,

    CONSTRAINT "Assistance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Personal" ADD CONSTRAINT "Personal_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistance" ADD CONSTRAINT "Assistance_assistancePersonalIdentificatorId_fkey" FOREIGN KEY ("assistancePersonalIdentificatorId") REFERENCES "AssistancePersonalIdentificator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
