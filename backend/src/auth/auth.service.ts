import { Injectable } from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from './dto';

@Injectable()
export class AuthService {
  async register(authRegisterDto: AuthRegisterDto) {
    console.log(authRegisterDto);
    return 'Register';
  }

  async login(authLoginDto: AuthLoginDto) {
    console.log(authLoginDto);
    return 'Login';
  }
}
