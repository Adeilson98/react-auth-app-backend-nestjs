// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { ProductModule } from './product/product.module';
// import { AuthModule } from './auth/auth.module';

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { Product } from "./product/product.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Substitua pelo seu usuário
      password: '',   // Substitua pela sua senha
      database: 'react_auth_products_db',
      entities: [User, Product], // Registre TODAS as suas entidades aqui
      synchronize: true, // CUIDADO: Use `migrations` em produção!
    }),
    UserModule, 
    ProductModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
