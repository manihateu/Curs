import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async register (dto: Partial<User>) {
        const existUser = await this.userService.findByEmail(dto.email)
        if (!existUser) {
            const user = await this.userService.create(dto);
            return user
        } else {
            throw new HttpException("пользователь с таким email уже существует", 400)
        }
    }

    async login (data: { email: string; password: string } ) {
        const existUser = await this.userService.findByEmail(data.email)
        if (!existUser) {
            throw new HttpException(
                'Пользователь с таким email не зарегистрирован',
                HttpStatus.CONFLICT,
            );
        }
        const isValidPassword = await this.userService.comparePasswords(
            data.password,
            existUser.password as any,
        )
        if (!isValidPassword) {
            throw new HttpException(
              'Неверный email или пароль',
              HttpStatus.BAD_REQUEST,
            );
        }
        const token = await this.tokenService.generateJwtToken(existUser);
        return {
            user: existUser,
            token: token,
        };
    }

    async getUser (token: string) {
        return await this.tokenService.getUserFromToken(token)
    }
}
