import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createProductDto: CreateProductDto, @Req() req) {
        const userId = req.user.userId;
        return this.productService.create(createProductDto, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(@Req() req) {
        const userId = req.user.userId;
        return this.productService.findAllByUserId(userId);
    }
}
