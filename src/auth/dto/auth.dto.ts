import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'Password must be at least 7 characters!' })
  public password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7, { message: 'Password must be at least 7 characters!' })
  public password: string;

  @IsString()
  @IsNotEmpty()
  public fullName: string;
}
