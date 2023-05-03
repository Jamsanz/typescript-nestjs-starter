import { HttpException, HttpStatus, Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { RequestWithUser } from './auth.interface';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel('User') private userModel: Model<IUser & Document>){}
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const Authorization = req.header('Authorization')?.split('Bearer ')[1];

      if (Authorization) {
        const secretKey: string = process.env.SECRET_KEY;
        const verificationResponse = (await verify(
          Authorization,
          secretKey,
        )) as any ;
        const userId = verificationResponse._id;
        const findUser = await this.userModel.findById(userId);

        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException('Wrong authentication token', HttpStatus.UNAUTHORIZED));
        }
      } else {
        next(new HttpException('Authentication token missing', HttpStatus.NOT_FOUND));
      }
    } catch (error) {
      next(new HttpException('Wrong authentication token', HttpStatus.NOT_ACCEPTABLE));
    }
  }
}
