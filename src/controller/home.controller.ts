import { Controller, Get, Post } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Welcome to Kanban!';
  }

  @Post('/Create')
  async createTask(): Promise<string> {
    return 'LogIn Page created successfully';
  }


}
