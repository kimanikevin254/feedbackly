import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { Prisma, Website } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { randomBytes } from 'crypto';
import { UsersService } from 'src/users/users.service';
import { WebsiteInterface } from './interfaces/website.interface';

@Injectable()
export class WebsiteService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService
  ){}

  generateSiteKey(): string {
    return randomBytes(8).toString('hex')
  }

  async create(createWebsiteDto: CreateWebsiteDto, userData: any): Promise<WebsiteInterface> {
    try {
      const sitekey = this.generateSiteKey()

      return await this.prismaService.website.create({ 
        data: { 
          ...createWebsiteDto, 
          sitekey, 
          ownerId: userData.userId 
        },
        select: {
          websiteId: true,
          name: true,
          url: true,
          description: true,
          sitekey: true,
        }
      })
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.message.includes('Unique constraint failed on the fields: (`url`)')){
          throw new HttpException('This website has already been registered.', HttpStatus.BAD_REQUEST) 
        }
      } else {
        throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR) 
      }
    }
  }

  findAll(userData: any): Promise<WebsiteInterface[]> {
    return this.prismaService.website.findMany({ 
      where: { ownerId: userData.userId },
      select: {
        websiteId: true,
        name: true,
        url: true,
        description: true,
        sitekey: true,
        owner: {
          select: {
            name: true,
            email: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    })
  }

  findOne(websiteId: string, userData: any) {
    return this.prismaService.website.findFirstOrThrow({ 
      where: { websiteId, ownerId: userData.userId },
      select: {
        websiteId: true,
        name: true,
        url: true,
        description: true,
        sitekey: true,
        owner: {
          select: {
            name: true,
            email: true
          }
        },
        createdAt: true,
        updatedAt: true
      }
    })
      .catch((err) => { 
        if(err?.message === 'No Website found'){
          throw new HttpException('Website does not exist', HttpStatus.NOT_FOUND)
        } else {
          throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
  }

  async update(websiteId: string, updateWebsiteDto: UpdateWebsiteDto, userData: any) {
    // Check if website exists and belongs to user
    const websiteExists = await this.findOne(websiteId, userData)

    if(!websiteExists) { throw new HttpException('Website does not exist', HttpStatus.NOT_FOUND) }

    // Update the website
    return await this.prismaService.website.update({
      where: { websiteId: websiteExists.websiteId },
      data: { ...updateWebsiteDto }
    })
  }

  async remove(websiteId: string, userData: any) {
    // Check if website exists and belongs to user
    const websiteExists = await this.findOne(websiteId, userData)

    if(!websiteExists) { throw new HttpException('Website does not exist', HttpStatus.NOT_FOUND) }

    return this.prismaService.website.delete({
      where: { websiteId: websiteExists.websiteId }
    })
  }
}
