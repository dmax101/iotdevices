import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/user.model';

require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '120s',
      },
    }),
    TypeOrmModule.forFeature([UserModel])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule {}
