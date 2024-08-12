import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma.service';
import { WebsiteService } from 'src/website/website.service';
import { Feedback } from '@prisma/client';

@Injectable()
export class FeedbackService {
  constructor(
    private prismaService: PrismaService,
    private websiteService: WebsiteService,
  ){}

  async create(createFeedbackDto: CreateFeedbackDto) {
    try {
      const website = await this.websiteService.retrieveBySitekey(createFeedbackDto.projectId)

      return await this.prismaService.feedback.create({
        data: {
          websiteId: website.websiteId,
          name: createFeedbackDto.name,
          email: createFeedbackDto.email,
          message: createFeedbackDto. message
        }
      })
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(websiteId: string, userData: any) {
    try {
      // Make sure website exists and is owned by the user
      const website = await this.websiteService.findOne(websiteId, userData)

      return await this.prismaService.feedback.findMany({ where: { websiteId: website.websiteId } })
    } catch (error) {
      throw new HttpException(error.message || 'Something went wrong.',  error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(websiteId: string, feedbackId: string, userData: any): Promise<Feedback> {
    // Make sure website exists and is owned by the user
    const website = await this.websiteService.findOne(websiteId, userData)

    return await this.prismaService.feedback.findFirstOrThrow({ 
      where: { websiteId: website.websiteId, feedbackId }, 
      select: {
        feedbackId: true,
        name: true,
        email: true,
        message: true,
        websiteId: true,
        website: {
          select: {
            websiteId: true,
            name: true,
            url: true,
            description: true
          }
        }
      }
    })
      .catch(err => {
        if(err?.message === 'No Feedback found'){
          throw new HttpException('Feedback does not exist', HttpStatus.NOT_FOUND)
        } else {
          throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
      })
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
