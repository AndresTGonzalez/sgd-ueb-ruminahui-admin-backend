import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JustificationFile } from '@prisma/client';

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
    // Eliminar el archivo de la carpeta public
    this.deleteFile(id);

    return this.prisma.justificationFile.delete({ where: { id } });
  }

  // Eliminar el archivo de la carpeta public dentro del servidor
  private async deleteFile(id: number) {
    const file = await this.prisma.justificationFile.findUnique({
      where: { id },
    });

    if (file) {
      const fs = require('fs');
      fs.unlinkSync(file.documentRoute);
    }
  }

  // Eliminar todos los archivi de una justificación en base al id de la justificación
  async deleteJustificationFilesByJustification(justificationId: number) {
    const files = await this.prisma.justificationFile.findMany({
      where: { justificationId },
    });

    files.forEach((file) => {
      console.log(this.deleteFile(file.id));
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
      console.log(this.deleteFile(file.id));
    });

    return this.prisma.justificationFile.deleteMany({
      where: {
        Justification: {
          personalId,
        },
      },
    });
  }
}
