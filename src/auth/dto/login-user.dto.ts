import { IsString, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty({message: 'O nome de usuário é obrigatório.'})
    @IsString({message: 'O nome de usuário deve ser uma string.'})
    username: string;

    @IsNotEmpty({message: 'A senha é obrigatória.'})
    @IsString({message: 'A senha deve ser uma string.'})
    password: string;
}