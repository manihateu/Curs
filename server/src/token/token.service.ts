import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(user: Partial<User>) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      secret: process.env.SECRET_KEY,
      expiresIn: '30d',
    });
  }

  async checkToken(token: string): Promise<Partial<User>> {
    return await this.jwtService.verify(token, {
      secret: process.env.SECRET_KEY,
    });
  }

  async hash_password(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async getUserFromToken(token: string): Promise<Partial<User>> {
    if (!token) throw new HttpException('Not auth', HttpStatus.UNAUTHORIZED);
    try {
      let user = await this.checkToken(token);
      return user;
    } catch (error) {
      throw new HttpException(
        'Error to validate token' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}