import { Controller, Post, Files, Param, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs';

@Controller('/upload')
export class UploadController {
  @Inject()
  ctx: Context;

  @Post('/:taskId')
  async uploadFile(@Files() files: any, @Param('taskId') taskId: string) {
    console.log('Received request for taskId:', taskId);
    console.log('Files received:', files);
    if (!taskId) {
      this.ctx.status = 400;
      return { message: 'Task ID is required' };
    }

    const file = files ? files[0] : null;
    if (!file) {
      this.ctx.status = 400;
      return { message: 'Attachment file is required' };
    }

    const uploadDir = path.join(__dirname, '../uploads', taskId);

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, file.filename);
      fs.copyFileSync(file.data, filePath);         //同步处理文件

      return {
        message: 'File uploaded successfully!',
        filePath: filePath,
      };
    } catch (error) {
      this.ctx.status = 500;
      return { message: 'Failed to upload file', error };
    }
  }
}
