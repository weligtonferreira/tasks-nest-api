import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { JwtTokenReponseDto } from './dto/jwt-token-response.dto';
import { IAuthService } from './interfaces/IAuthService';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<JwtTokenReponseDto> {
    const user = await this.userService.findByEmailForAuthentication(email);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const jwtConfig = {
      payload: {
        sub: user.id,
        email: user.email,
      },
      options: {
        expiresIn: '2d',
        secret: 'SECRET',
      },
    };

    const { payload, options } = jwtConfig;

    const access_token = await this.jwtService.signAsync(payload, options);

    return { access_token };
  }
}
