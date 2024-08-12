import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { PrismaService } from 'src/prisma.service';
import { WebsiteService } from 'src/website/website.service';

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

  findAll() {
    return `This action returns all feedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
