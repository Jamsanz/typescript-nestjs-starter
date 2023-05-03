import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { IUser } from './users.interface';
import { UsersService } from './users.service';
import { response } from '../utils';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getUsers(): Promise<response<IUser[]>> {
    const data = await this.usersService.findAll();
    return {data, success: true, message: 'Find All'}
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string): Promise<response<IUser>> {
    const data = await this.usersService.findById(id);
    return {data, success: true, message:'Find By Id'}
  }

  @Post()
  public async createUser(@Body() user: IUser): Promise<response<IUser>> {
    const data = await this.usersService.create(user);
    return {data, success: true, message: 'created successfully'}
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: IUser,
  ): Promise<response<IUser>> {
    const data = await this.usersService.update(id, user);
    return {data, success: true, message: 'updated successfully'}
  }
  
  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<response<IUser>> {
    const data = await this.usersService.delete(id);
    return {data, success: true, message: 'deleted successfully'}
  }
}
