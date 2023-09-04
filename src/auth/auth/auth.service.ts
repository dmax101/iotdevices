import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const users = [
  {
    id: 1,
    username: 'user1@user.com',
    password: '$2b$10$oJr/a963iIWtV1siC8vtJOB25.HsLFZ1thSBlg7T/Jm46HSoXu0OO', // senhadodanilo
  },
  {
    id: 2,
    username: 'user2@user.com',
    password: '$2b$10$oJr/a963iIWtV1siC8vtJOB25.HsLFZ1thSBlg7T/Jm46HSoXu0OO', // senhadodanilo
  },
  {
    id: 3,
    username: 'user3@user.com',
    password: '$2b$10$oJr/a963iIWtV1siC8vtJOB25.HsLFZ1thSBlg7T/Jm46HSoXu0OO', // senhadodanilo
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const user = this.validateCredentials(username, password);

    const payload = {
      sub: user.id,
      username: user.username,
    };

    return this.jwtService.sign(payload);
  }

  validateCredentials(username: string, password: string) {
    const user = users.find(
      (u) =>
        u.username === username && bcrypt.compareSync(password, u.password),
    );

    if (!user) {
      throw new Error('User not found!');
    }

    return user;
  }
}
