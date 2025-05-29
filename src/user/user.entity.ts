import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Product} from '../product/product.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string

    @Column({ nullable: false})
    password: string;

    @OneToMany(() => Product, product => product.user)
    products: Product[];
}