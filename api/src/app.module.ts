import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsiteModule } from './website/website.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, UsersModule, WebsiteModule, FeedbackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
