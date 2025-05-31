import {IsString, IsNumber, IsOptional, IsNotEmpty} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty({message: 'O nome do produto é obrigatório.'})
    @IsString({message: 'O nome deve ser uma string.'})
    name: string;

    @IsNotEmpty({message: 'O preço do produto é obrigatório.'})
    @IsNumber({}, {message: 'O preço deve ser um número.'})
    price: number;

    @IsOptional()
    @IsString({message: 'A descrição deve ser uma string.'})
    description?: string;
}