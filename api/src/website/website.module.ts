import { Module } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { WebsiteController } from './website.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [WebsiteController],
  providers: [WebsiteService, PrismaService],
  imports: [UsersModule],
  exports: [WebsiteService]
})
export class WebsiteModule {}
