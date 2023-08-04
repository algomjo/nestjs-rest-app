import { Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('users')
  async createUser() {
    return this.appService.createUser();
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string) {
    const parsedUserId = parseInt(userId, 10);
    return this.appService.getUser(userId);
  }

  @Get('user/:userId/avatar')
  async getUserAvatar(@Param('userId') userId: string) {
    return this.appService.getUserAvatar(userId);
  }

  @Delete('user/:userId/avatar')
  async deleteUserAvatar(@Param('userId') userId: string) {
    return this.appService.deleteUserAvatar(userId);
  }
}
