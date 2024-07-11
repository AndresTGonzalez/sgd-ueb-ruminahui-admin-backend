import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonalPhoto } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PersonalPhotoService {
  constructor(private readonly prisma: PrismaService) {}

  // Agregar una foto a un empleado
  async createPhoto(data: PersonalPhoto) {
    return this.prisma.personalPhoto.create({
      data,
    });
  }

  // Obtener la foto de un empleado
  async getPhoto(personalId: number) {
    return this.prisma.personalPhoto.findFirst({
      where: { personalId },
    });
  }

  // Eliminar la foto de un empleado
  async deletePhoto(personalId: number) {
    // Obtengo la foto por su id
    const photo = await this.prisma.personalPhoto.findUnique({
      where: { personalId },
    });

    if (photo) {
      this.deleteFile(photo.photoName);
      return this.prisma.personalPhoto.delete({
        where: { personalId },
      });
    }
  }

  // Eliminar la foto de un empleado en el servidor
  private async deleteFile(fileName: string) {
    const publicFolder = path.join(
      __dirname,
      '../..',
      'public/personal-photos',
    );

    const filePath = path.join(publicFolder, fileName);

    try {
      // Elimina el archivo sincrónicamente
      fs.unlinkSync(filePath);
    } catch (err) {
      throw new Error(`No se pudo eliminar el archivo ${fileName}`);
    }
  }
}
