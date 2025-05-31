import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async register(registerUserDto: RegisterUserDto): Promise<any> {
        const {username, password} = registerUserDto;
        const existingUser = await this.userService.findOneByUsername(username);

        if(existingUser) {
            throw new UnauthorizedException('Nome de usuário já existe.')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userService.createUser(username, hashedPassword);

        return {message: 'Usuário registrado com sucesso!'};

    }

    async login(loginUserDto: LoginUserDto): Promise<{accessToken: string}> {
        const {username, password} = loginUserDto;
        const user = await this.userService.findOneByUsername(username);

        if(!user) {
            throw new UnauthorizedException('Credeciais inválidas');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const payload = {username: user.username, userId: user.id}

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
