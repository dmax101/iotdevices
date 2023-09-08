import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private tokenBlacklist: Set<string> = new Set();

  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserModel) private userModel: Repository<UserModel>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.validateCredentials(email, password);

    const payload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    if (this.tokenBlacklist.has(token)) {
      throw new Error('Token revoked');
    }

    return token;
  }

  addToBlacklist(token: string): void {
    this.tokenBlacklist.add(token);
  }

  async validateCredentials(email: string, password: string) {
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

    const user = await this.userModel
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.devices', 'devices')
      .where({ email: email })
      .select(['user'])
      .getOne();

    if (!user) {
      throw new Error('User not found!');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Email or password is incorrect!');
    }

    return user;
  }
}
