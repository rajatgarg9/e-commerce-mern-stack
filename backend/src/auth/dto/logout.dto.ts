import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  accessToken: string;

  @IsNotEmpty()
  refreshToken: string;
}
