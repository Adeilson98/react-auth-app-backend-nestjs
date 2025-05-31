import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('produtos')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false})
    name: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column()
    userId: number

    @ManyToOne(() => User, user => user.products)
    user: User;
}