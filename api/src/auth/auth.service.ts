import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async comparePassword(providedPassword: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(providedPassword, userPassword)
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email)

        if(user && await this.comparePassword(password, user.password)){
            const { password, ...rest } = user
            return rest
        }

        return null
    }

    async registerUser(data: CreateUserDto){
        try {
            const user = await this.userService.create(data)

            const payload = { email: user?.email, sub: user.userId }

            return {
                access_token: this.jwtService.sign(payload)
            }
        } catch (error) {
            if(error?.message?.includes('Unique constraint failed on the fields: (`email`)')){
                throw new HttpException('This email address is already registered', HttpStatus.FORBIDDEN)
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async login(user: any){
        const payload = { email: user?.email, sub: user.userId }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
