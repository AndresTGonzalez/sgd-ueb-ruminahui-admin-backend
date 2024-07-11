import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JustificationFile } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class JustificationFileService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los archivos de una justificación
  async getJustificationFiles(justificationId: number) {
    return this.prisma.justificationFile.findMany({
      where: { justificationId },
    });
  }

  // Guardar la ruta de un archivo en la base de datos
  async createJustificationFile(data: JustificationFile) {
    return this.prisma.justificationFile.create({ data });
  }

  // Eliminar la ruta de un archivo en la base de datos
  async deleteJustificationFile(id: number) {
    // Obtengo el archivo por su id
    const file = await this.prisma.justificationFile.findUnique({
      where: { id },
    });

    // Elimino el archivo del servidor
    this.deleteFile(file.documentName);

    return this.prisma.justificationFile.delete({ where: { id } });
  }

  // Eliminar el archivo de la carpeta public dentro del servidor
  private async deleteFile(fileName: string) {
    const publicFolder = path.join(
      __dirname,
      '../..',
      'public/justification-docs',
    );

    const filePath = path.join(publicFolder, fileName);

    try {
      // Elimina el archivo sincrónicamente
      fs.unlinkSync(filePath);
    } catch (err) {
      throw new Error(`No se pudo eliminar el archivo ${fileName}`);
    }
  }

  // Eliminar todos los archivi de una justificación en base al id de la justificación
  async deleteJustificationFilesByJustification(justificationId: number) {
    const files = await this.prisma.justificationFile.findMany({
      where: { justificationId },
    });

    files.forEach((file) => {
      console.log(this.deleteFile(file.documentName));
    });

    return this.prisma.justificationFile.deleteMany({
      where: { justificationId },
    });
  }

  // Eliminar todos los archivos de una justificación en base al id del empleado
  async deleteJustificationFilesByPersonalId(personalId: number) {
    const files = await this.prisma.justificationFile.findMany({
      where: {
        Justification: {
          personalId,
        },
      },
    });

    files.forEach((file) => {
      this.deleteFile(file.documentName);
    });

    return this.prisma.justificationFile.deleteMany({
      where: {
        Justification: {
          personalId,
        },
      },
    });
  }

  // Obtener un archivo por su id
  async getJustificationFileById(id: number) {
    return this.prisma.justificationFile.findUnique({
      where: { id },
    });
  }
}
