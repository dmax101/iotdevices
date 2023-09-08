import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UUID } from 'crypto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(
    @InjectRepository(UserModel) private model: Repository<UserModel>,
  ) {}

  @Post()
  @UseGuards(RoleGuard)
  @Role(['admin'])
  public async create(@Body() body: UserDto): Promise<{ data: UserModel }> {
    const existingUser = await this.model.findOne({
      where: { email: body.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exist on our database!');
    }

    const password = Math.random().toString(36).slice(-8);

    const hashValue = await new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(10, (err: any, salt: any) => {
        if (err) {
          reject(err);
        } else {
          bcrypt.hash(password, salt, (err: any, hash: string) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });

    const newUser = {
      ...body,
      password: hashValue,
    };

    const userCreated = await this.model.save(newUser);
    return { data: { ...userCreated, password } };
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<{ data: UserDto }> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const { password, ...rest } = user;

    return { data: rest };
  }

  @Get()
  public async getAll(): Promise<{ data: UserDto[] }> {
    const list = await this.model.find();

    return {
      data: list.map((user) => {
        const { password, ...rest } = user;
        return rest;
      }),
    };
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @Role(['admin', 'self'])
  public async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() body: UserDto,
  ): Promise<{ data: UserDto | Omit<UserModel, 'password'> }> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    if (body.password) {
      const hashValue = await new Promise<string>((resolve, reject) => {
        bcrypt.genSalt(10, (err: any, salt: any) => {
          if (err) {
            reject(err);
          } else {
            bcrypt.hash(body.password, salt, (err: any, hash: string) => {
              if (err) {
                reject(err);
              } else {
                resolve(hash);
              }
            });
          }
        });
      });

      const newUser = {
        ...body,
        password: hashValue,
      };

      const { firstName, lastName, email, password } = newUser;

      await this.model.update({ id }, { firstName, lastName, email, password });

      return { data: { ...newUser, password: body.password } };
    } else {
      const { firstName, lastName, email } = body;

      await this.model.update({ id }, { firstName, lastName, email });

      return {
        data: {
          ...body,
          id,
        },
      };
    }
  }

  @UseGuards(RoleGuard)
  @Role(['admin', 'self'])
  @Delete(':id')
  public async delete(
    @Param('id', ParseUUIDPipe) id: UUID,
  ): Promise<{ data: UserModel; message?: string }> {
    const user = await this.model.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    this.model.delete({ id });

    return { data: user, message: 'User deleted successfully!' };
  }
}
