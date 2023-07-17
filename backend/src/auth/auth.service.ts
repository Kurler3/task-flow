import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto) {
    // Hash pass
    const passwordHash = await argon.hash(authRegisterDto.password);

    try {
      delete authRegisterDto.password;
      // Create new user.
      const newUser = await this.prismaService.user.create({
        data: {
          ...authRegisterDto,
          hash: passwordHash,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });

      // Return user.
      return newUser;
    } catch (error) {
      console.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Duplicate fields (in the docs)
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }
      throw error;
    }
  }

  async login(authLoginDto: AuthLoginDto) {
    // Find user by email.
    const user = await this.prismaService.user.findFirst({
      where: {
        email: authLoginDto.email,
      },
    });

    // If not found => error.
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    // Compare hashed password with provided one.
    const pwMatch = await argon.verify(user.hash, authLoginDto.password);

    // If not same => error.
    if (!pwMatch) {
      throw new ForbiddenException('Incorrect credentials.');
    }

    // Sign jwt token.
    const jwtToken = await this.signJwtToken(user.id, user.email);

    const refreshToken = await this.signJwtToken(user.id, user.email, true);

    // Return token.
    return {
      token: jwtToken,
      refreshToken: refreshToken,
    };
  }

  // sign jwt token
  async signJwtToken(
    userId: number,
    email: string,
    isRefreshToken?: boolean,
  ): Promise<string> {
    // Payload.
    const payload = {
      sub: userId,
      email,
    };

    // Jwt params.
    const jwtParams = {
      expiresIn: isRefreshToken ? '30d' : '15m',
      secret: this.config.get('JWT_SECRET'),
    };

    // Access token.
    const access_token = await this.jwtService.signAsync(payload, jwtParams);

    return access_token;
  }
}
