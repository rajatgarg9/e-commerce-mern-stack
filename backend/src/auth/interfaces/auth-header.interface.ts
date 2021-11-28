import { IsNotEmpty } from 'class-validator';

export class IAuthHeader {
  @IsNotEmpty()
  authorization: string;
}
