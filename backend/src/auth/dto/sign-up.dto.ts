import { LoginDto } from './login.dto';
import { IsNotEmpty } from 'class-validator';

export class SignUpDto extends LoginDto {
  @IsNotEmpty()
  name: string;
}
