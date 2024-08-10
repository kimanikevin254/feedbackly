import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpCode } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@Controller('website')
@UseGuards(JwtAuthGuard)
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto, @Req() req: any) {
    return this.websiteService.create(createWebsiteDto, req.user);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.websiteService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') websiteId: string, @Req() req: any) {
    return this.websiteService.findOne(websiteId, req.user);
  }

  @Patch(':id')
  update(@Param('id') websiteId: string, @Body() updateWebsiteDto: UpdateWebsiteDto, @Req() req: any) {
    return this.websiteService.update(websiteId, updateWebsiteDto, req.user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') websiteId: string, @Req() req: any) {
    return this.websiteService.remove(websiteId, req.user);
  }
}
