import { JwtTokenReponseDto } from '../dto/jwt-token-response.dto';

export interface IAuthService {
  signIn(email: string, password: string): Promise<JwtTokenReponseDto>;
}
