import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async findOneByUsername(username: string): Promise< User | null> {
        return this.usersRepository.findOne({where: {username}});
    }

    async createUser(username: string, passwordHash: string): Promise<User> {
        const newUser = this.usersRepository.create({username, password: passwordHash});
        return this.usersRepository.save(newUser);
    }

    async findUserById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({where: {id}});
    }
}
