import { Provide, Controller, Post, Body, Inject, Get, Query, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
@Controller('/tasks')
export class TaskController {

  @Inject()
  ctx: Context;

  @Post('/')
  async saveTasks(@Body() data: any) {
    const { email, password, panels } = data;  // 从请求体中获取email, password 和 tasks
    const filePath = path.join(__dirname, `../panels_${email}.json`);  // 根据email生成独特的文件路径

    const contentToSave = {
      email,  // 添加email信息
      password,  // 添加password信息
      panels  // 添加tasks数据
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

  @Get('/:taskId/attachments')
  async getAttachment(@Param('taskId') taskId: string) {
    const dirPath = join(__dirname, '../../dist/uploads', taskId);
    
    // 确保文件存在，可以加一些检查逻辑
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);

      if(files.length > 0) {
        // 获取最后一个文件名
        const fileName = files[files.length - 1];
        const filePath = path.join(dirPath, fileName);
        const fileStream = fs.createReadStream(filePath);
        
        this.ctx.set('Content-Type', 'application/octet-stream');
        this.ctx.set('Content-Disposition', `attachment; filename=${fileName}`);
        return fileStream;
      } else {
        this.ctx.throw(404, 'Not found');
      }
    } else {
      console.log(`File ${dirPath} not found`);
      console.log(`dirName: ${dirPath}`);
      this.ctx.throw(404, 'File not found');
    }
  }

  @Get('/') 
  async getTasks(@Query('email') email: string) {
    console.log(email); 
    const filePath = path.join(__dirname, `../panels_${email}.json`);  // 根据 email 生成独特的文件路径
    
    if (fs.existsSync(filePath)) {
      console.log(`panels_${email}.json exists`);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      const panels = data.panels;  // 获取 panels 数据
      return { success: true, message: 'Panels retrieved successfully!', panels };
    } else {
      // 如果文件不存在，创建一个空的 panels 文件并返回
      const emptyPanels = { email: email, password: [], panels: [{ todo: [], doing: [], done: [] }] };  // 创建初始 panels
      fs.writeFileSync(filePath, JSON.stringify(emptyPanels, null, 2));
      const panels = emptyPanels.panels;
      return { success: true, message: 'Panels retrieved successfully!', panels };
    }
  }
  



}
