import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService
  ){}

  async hashPassword(password: string): Promise<string> {
      try {
          return await bcrypt.hash(password, 12)
      } catch (error) {
          throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }

  async create(data: Prisma.UserCreateInput): Promise<UserInterface> {
    const hashedPassword = await this.hashPassword(data.password)
    const { password, ...rest } = data
    return this.prismaService.user.create({ 
      data: { password: hashedPassword, ...rest },
      select: {
        userId: true,
        name: true,
        email: true,
        createdAt: true
      } 
    })
  }

  async profile(userData: any){
    return this.prismaService.user.findUnique({ 
      where: { email: userData.email },
      select: {
        userId: true,
        name: true,
        email: true,
        createdAt: true
      }
    })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({ where: { email } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
