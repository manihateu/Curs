import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class  CreateDocumentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    theme: string;

    @IsNotEmpty()
    @IsString()
    inventoryNumber: string;

    @IsNotEmpty()
    @IsString()
    cellCode: string;

    @IsNotEmpty()
    @IsInt()
    quantity: number;

    @IsNotEmpty()
    @IsDate()
    entryDate: Date;

    @IsNumber()
    subscriberId: number

    @IsNumber()
    archiveId: number
}