import { Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
import { TokenService } from 'src/token/token.service';
import { JwtToken } from 'src/token/jwt.token.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {} 
    @Post('login')
    async login (dto: Partial<User>) {
        return await this.authService.login(
            {
                email: dto.email,
                password: dto.password
            }
        )
    }

    @Post("register")
    async register (dto: Partial<User>) {
        return await this.authService.register(dto)
    }

    @Get('user')
    async getUser (@JwtToken() token: string) {
        return await this.authService.getUser(token)
    }
}
