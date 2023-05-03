import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AdminGuard, SuperAdminGuard } from './auth.guard';
import { userSchema } from '../users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
        MongooseModule.forFeature([
      {
        name: 'User',
        schema: userSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard, SuperAdminGuard],
})
export class AuthModule {}
