import { SignInDto } from '../../user/dto/sign-in.dto';
import { JwtTokenReponseDto } from '../dto/jwt-token-response.dto';

export interface IAuthController {
  signIn(signInDto: SignInDto): Promise<JwtTokenReponseDto>;
}
