import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Req } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CreateFeedbackGuard } from './utils/create-feedback.guard';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@Controller('website/:websiteId/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Should not have any auth guards
  // Should be accessible to public to allow users to create feedback
  @Post()
  @UseGuards(CreateFeedbackGuard)
  @HttpCode(204)
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return await this.feedbackService.create(createFeedbackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Param('websiteId') websiteId: string, @Req() req: any) {
    return this.feedbackService.findAll(websiteId, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':feedbackId')
  findOne(@Param('websiteId') websiteId: string, @Param('feedbackId') feedbackId: string,  @Req() req: any) {
    return this.feedbackService.findOne(websiteId, feedbackId, req.user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
  //   return this.feedbackService.update(+id, updateFeedbackDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.feedbackService.remove(+id);
  // }
}
