import { IsOptional, IsString } from 'class-validator';
import { AuthLoginDto } from './auth-login.dto';

export class AuthRegisterDto extends AuthLoginDto {
  @IsOptional()
  @IsString()
  firstName?: string;
  @IsOptional()
  @IsString()
  lastName?: string;
}
