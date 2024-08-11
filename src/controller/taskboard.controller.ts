import { Provide, Controller, Post, Body, Inject, Get, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
@Controller('/tasks')
export class TaskController {

  @Inject()
  ctx: Context;

  @Post('/')
  async saveTasks(@Body() data: any) {
    const { email, password, tasks } = data;  // 从请求体中获取email, password 和 tasks
    const filePath = path.join(__dirname, `../tasks_${email}.json`);  // 根据email生成独特的文件路径

    const contentToSave = {
      email,  // 添加email信息
      password,  // 添加password信息
      tasks  // 添加tasks数据
    };

    try {
      fs.writeFileSync(filePath, JSON.stringify(contentToSave, null, 2));  // 保存到文件
      return { message: 'Tasks saved successfully!' };
    } catch (error) {
      this.ctx.status = 500;
      return { message: 'Failed to save tasks', error };
    }
  }

  @Get('/')
  async getTasks(@Query('email') email: string) {
    console.log(email); 
      const filePath = path.join(__dirname, `../tasks_${email}.json`);  // 根据email生成独特的文件路径
      
      if(fs.existsSync(filePath)){
        console.log(`tasks_${email}.json exists`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        const tasks = data.tasks;
        return { success: true ,message: 'Tasks retrieved successfully!', tasks };
      }else{
        const emptyTasks = { email: email, password: [], tasks: { todo: [], doing: [], done: [] }};
        fs.writeFileSync(filePath, JSON.stringify(emptyTasks, null, 2));
        const tasks = emptyTasks.tasks;
        return { success: true ,message: 'Tasks retrieved successfully!', tasks };
      }
  }
}
