import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Employee } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { AssistanceEmployeeIdentificatorService } from 'src/assistance-employee-identificator/assistance-employee-identificator.service';
import { CreateAssistanceEmployeeIdentificatorDto } from '../assistance-employee-identificator/assistance-employee-identificator.model';
import { AssistanceDispositiveService } from 'src/assistance-dispositive/assistance-dispositive.service';
import { CreateEmployeeDto } from './employees.model';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly assistanceEmployeeIdentificatorService: AssistanceEmployeeIdentificatorService,
    private readonly assistanceDispositiveService: AssistanceDispositiveService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.prismaService.employee.create({
      data: {
        ...createEmployeeDto,
        maritalStatusId: createEmployeeDto.maritalStatusId,
        cityId: createEmployeeDto.cityId,
        laboralRegimeId: createEmployeeDto.laboralRegimeId,
        functionId: createEmployeeDto.positionId,
        genderId: createEmployeeDto.genderId,
      },
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
      } else {
        await this.registerEmployeAssistanceIdentificator(
          data.user.id,
          employee.id,
        );
      }
    }
  }

  private async registerEmployeAssistanceIdentificator(
    uuid: string,
    employeeId: number,
  ) {
    const assistanceDispositive =
      await this.assistanceDispositiveService.getBySerial(
        this.configService.get<string>('VIRTUAL_ASSISTANT_IDENTIFICATOR'),
      );

    const createAssistanceEmployeeIdentificatorDto: CreateAssistanceEmployeeIdentificatorDto =
      {
        assistanceDispositiveId: assistanceDispositive.id,
        code: uuid,
        employeId: employeeId,
      };

    await this.assistanceEmployeeIdentificatorService.create(
      createAssistanceEmployeeIdentificatorDto,
    );
  }
}
