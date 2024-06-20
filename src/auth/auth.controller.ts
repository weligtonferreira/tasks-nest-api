import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { SignInDto } from '../user/dto/sign-in.dto';
import { IAuthController } from './interfaces/IAuthController';
import { JwtTokenReponseDto } from './dto/jwt-token-response.dto';
import { UnauthorizedExceptionResponseDto } from './dto/unauthorized-exception-response.dto';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'email',
    description: 'E-mail of user',
  })
  @ApiParam({
    name: 'password',
    description: 'Password of user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the jwt token',
    type: [JwtTokenReponseDto],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Email or password is incorrect',
    type: [UnauthorizedExceptionResponseDto],
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }
}
