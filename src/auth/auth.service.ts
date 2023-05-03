import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';
import { authResponse, isEmpty, ITokenData } from 'src/utils';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { sign } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {

  constructor(@InjectModel('User') private userModel: Model<IUser & Document>) { }
  
  public async signup(auth: SignUpDto): Promise<authResponse<IUser>> {
    if (isEmpty(auth)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    const user = await this.userModel.findOne({ email: auth.email });
    if (user) throw new HttpException('user already exists', HttpStatus.CONFLICT);
    const hashedPassword = await hash(auth.password, 10);
    const newUser = await this.userModel.create({ ...auth, password: hashedPassword });
    const tokenData = this.createToken(newUser);
    const cookie = this.createCookie(tokenData);
    
    return { token: tokenData.token, cookie, data: newUser };
  }
  
  public async login(auth: LoginDto): Promise<authResponse<IUser>> {
    if (isEmpty(auth)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    const user = await this.userModel.findOne({ email: auth.email });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const passwordCheck = await compare(auth.password, user.password);
    if (!passwordCheck) throw new HttpException('Incorrect login credentials', HttpStatus.CONFLICT);
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);

    return { token: tokenData.token, cookie, data: user };
    
  }

  public createToken(user: IUser): ITokenData {
    const dataStoredInToken = {
      _id: user._id,
      email: user.email,
      name: user.name,
      profile: user?.profileImg,
      address: user?.address,
      dob: user?.dob,
      phone: user?.phone,
    };
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: ITokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`
  }
}
