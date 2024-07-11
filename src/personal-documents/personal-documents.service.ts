import { Injectable } from '@nestjs/common';
import { PersonalFile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersonalDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPersonalDocuments(personalId: number) {
    return this.prisma.personalFile.findMany({
      where: { personalId },
    });
  }

  // Guardar la ruta de un archivo en la base de datos
  async createPersonalDocument(data: PersonalFile) {
    return this.prisma.personalFile.create({ data });
  }

  // Eliminar la ruta de un archivo en la base de datos
  async deletePersonalDocument(id: number) {
    // Obtengo el archivo por su id
    const file = await this.prisma.personalFile.findUnique({ where: { id } });

    // Elimino el archivo del servidor
    this.deleteFile(file.documentName);

    return this.prisma.personalFile.delete({ where: { id } });
  }

  // Eliminar el archivo de la carpeta public dentro del servidor
  private async deleteFile(fileName: string) {
    const publicFolder = path.join(__dirname, '../..', 'public/personal-docs');

    const filePath = path.join(publicFolder, fileName);

    try {
      // Elimina el archivo sincrónicamente
      fs.unlinkSync(filePath);
    } catch (err) {
      throw new Error(`No se pudo eliminar el archivo ${fileName}`);
    }
  }

  // Eliminar todos los archivos de un empleado en base al id del empleado
  async deletePersonalDocumentsByPersonalId(personalId: number) {
    const files = await this.prisma.personalFile.findMany({
      where: { personalId },
    });

    files.forEach((file) => {
      this.deleteFile(file.documentName);
    });

    return this.prisma.personalFile.deleteMany({
      where: { personalId },
    });
  }

  // Obtener un archivo por su id
  async getPersonalDocumentById(id: number) {
    return this.prisma.personalFile.findUnique({
      where: { id },
    });
  }
}
