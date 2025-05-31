import {IsString, IsNotEmpty, MinLength} from 'class-validator';

export class RegisterUserDto {
    @IsNotEmpty({message: 'O nome de usuário é obrigatório.'})
    @IsString({message: 'O nome de usuário deve ser uma string.'})
    username: string;

    @IsNotEmpty({message: 'A senha é obrigatória.'})
    @IsString({message: 'A senha deve ser uma string.'})
    @MinLength(6, {message: 'A senha deve ter pelo menos 6 caracteres.'})
    password: string;
}