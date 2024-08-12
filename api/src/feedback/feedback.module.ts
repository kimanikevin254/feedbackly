import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { PrismaService } from 'src/prisma.service';
import { WebsiteModule } from 'src/website/website.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService, PrismaService],
  imports: [WebsiteModule]
})
export class FeedbackModule {}
