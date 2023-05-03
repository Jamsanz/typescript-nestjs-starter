import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsArray } from 'class-validator';
import { IUser } from 'src/users/users.interface';

export class SignUpDto implements IUser {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsString()
  profileImg?: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsArray()
  role?: ('ADMIN' | 'SUPER_ADMIN' | 'USER')[];
}
