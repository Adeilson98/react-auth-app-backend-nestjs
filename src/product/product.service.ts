import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    //Cria o produto associado ao ID do usuário
    async create(createProductDto: CreateProductDto, userId: number): Promise<Product> {
        const newProduct = this.productRepository.create({ ...createProductDto, userId });
        return this.productRepository.save(newProduct);
    }

    //Busca todos os produtos apenas do usuário logado
    async findAllByUserId(userId: number): Promise<Product[]> {
        return this.productRepository.find({
            where: {userId},
            order: {id: 'DESC'},
        });
    }

    async findOneByUserId(productId: number, userId: number): Promise<Product | null> {
        return this.productRepository.findOne({
            where: {id: productId, userId}
        });
    }
}
