import { ApiProperty } from '@nestjs/swagger';

// model AssistanceEmployeeIdentificator {
//   id                      Int                   @id @default(autoincrement())
//   code                    String                @unique
//   employeeId              Int
//   Employee                Employee              @relation(fields: [employeeId], references: [id])
//   assistanceDispositiveId Int
//   AssistanceDispositive   AssistanceDispositive @relation(fields: [assistanceDispositiveId], references: [id])
//   Assistance              Assistance[]
// }

export class CreateAssistanceEmployeeIdentificatorDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  employeeId: number;

  @ApiProperty()
  assistanceDispositiveId: number;
}
