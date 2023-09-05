import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/users/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
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
    };

    return this.jwtService.sign(payload);
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

    const user = await this.userModel.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error('User not found!');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Email or password is incorrect!');
    }

    return user;
  }
}
