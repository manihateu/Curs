import { IsDate, IsNotEmpty, IsString, Length } from "class-validator";

export class createSubscriberDto {
    @IsNotEmpty()
    @IsString()
    @Length(32)
    name: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsNotEmpty()
    @IsString()
    @Length(11)
    phone: string;

    @IsNotEmpty()
    @IsDate()
    receivedDate: Date;
}