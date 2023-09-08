import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from './devices/devices.module';
import { ConfigModule } from '@nestjs/config';
import { SharedDevicesModule } from './shared-devices/shared-devices.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    DevicesModule,
    SharedDevicesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.model.js', 'dist/**/*.entity.js'],
      cache: Boolean(process.env.TYPEORM_CACHE),
      synchronize: Boolean(process.env.TYPEORM_SYNCRHONIZE),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
