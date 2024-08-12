import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { CreateFeedbackGuard } from './utils/create-feedback.guard';

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

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, updateFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
