import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from 'src/token/token.service';
import { JwtStrategy } from 'src/token/local.jwt.strategy';
import { TokenModule } from 'src/token/token.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, TokenService, JwtStrategy],
  controllers: [AuthController],
  imports: [TokenModule, JwtModule, UserModule]
})
export class AuthModule {}
