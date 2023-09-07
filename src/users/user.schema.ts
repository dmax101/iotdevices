import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength, minLength } from 'class-validator';

export class UserSchema {
  @IsString()
  @MaxLength(300)
  firstName: string;

  @IsString()
  @MaxLength(300)
  lastName: string;

  @IsString()
  @IsEmail()
  @MaxLength(300)
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  password?: string

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean
}
