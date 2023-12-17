// src/archive/dto/archive.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateArchiveDto {
  @IsInt()
  @IsNotEmpty()
  shelf: number;

  @IsInt()
  @IsNotEmpty()
  shelfNumber: number;

  @IsInt()
  @IsNotEmpty()
  cell: number;

  @IsString()
  @IsNotEmpty()
  cellCode: string;

  @IsString()
  @IsNotEmpty()
  
  filling: string;
}
