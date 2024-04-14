import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '@prisma/client';
import { CreateEmployeeDto } from './employees.model';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.prismaService.employee.create({
      data: createEmployeeDto,
    });
    await this.createEmployeeUser(employee);
    return employee;
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

  private async createEmployeeUser(employee: Employee) {
    const supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_KEY'),
    );

    // Crear el email del usuario con la primera letra del nombre y el primer apellido
    const user = employee.names.charAt(0) + employee.lastNames.split(' ')[0];
    const email = `${user.toLowerCase()}@sgdruminahui.com`;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: employee.identificationCard,
    });

    if (error) {
      console.error(error);
      throw new Error('Error al crear el usuario en Supabase');
    } else {
      const { error } = await supabase.from('users').insert({
        uuid: data.user.id,
      });

      if (error) {
        console.error(error);
        throw new Error('Error al crear el usuario en Supabase');
      }
    }
  }
}
