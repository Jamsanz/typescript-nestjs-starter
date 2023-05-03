import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../users.interface";
import { IsArray, IsEmail, IsString } from "class-validator";

export class CreateUserDto implements IUser {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  profileImg: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  dob?: string;

  @ApiProperty()
  @IsString()
  _id?: string;
  
  @ApiProperty()
  @IsArray()
  role?: ('ADMIN' | 'SUPER_ADMIN' | 'USER')[];
}