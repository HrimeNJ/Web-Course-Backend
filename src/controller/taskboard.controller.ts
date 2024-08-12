import { Provide, Controller, Post, Body, Inject, Get, Query, Files } from '@midwayjs/decorator';
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

    console.log(contentToSave);

    try {
      fs.writeFileSync(filePath, JSON.stringify(contentToSave, null, 2));  // 保存到文件
      return { message: 'Tasks saved successfully!' };
    } catch (error) {
      this.ctx.status = 500;
      return { message: 'Failed to save tasks', error };
    }
  }

  @Post('/files')
    async uploadFile(@Files() files: any) {
    if (!files || files.length === 0) {
        return { message: 'No file uploaded' };
    }

    const file = files[0]; // 获取第一个文件（假设只上传一个文件）
    const filePath = path.join(__dirname, 'uploads', file.filename); // 上传路径

    try {
        fs.writeFileSync(filePath, file.data); // 保存到本地
        return { message: 'File uploaded successfully!' };
    } catch (error) {
        console.error('Error saving file:', error);
        return { message: 'Failed to upload file', error };
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
