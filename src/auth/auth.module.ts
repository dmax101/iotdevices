import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './services/jwt-strategy/jwt-strategy.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from 'src/users/entities/user.entity';
import { AuthController } from './auth.controller';

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
