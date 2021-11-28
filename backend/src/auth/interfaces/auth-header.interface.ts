import { IsNotEmpty } from 'class-validator';

export class AuthHeader {
  @IsNotEmpty()
  authorization: string;
}
