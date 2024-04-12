import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto } from './employees.model';

@Injectable()
export class EmployeesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.prismaService.employee.create({ data: createEmployeeDto });
  }

  async findAll(): Promise<Employee[]> {
    return this.prismaService.employee.findMany();
  }

  async findOne(id: number): Promise<Employee> {
    return this.prismaService.employee.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.prismaService.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number): Promise<Employee> {
    return this.prismaService.employee.delete({ where: { id } });
  }
}
