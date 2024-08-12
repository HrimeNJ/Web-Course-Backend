import { Provide } from '@midwayjs/decorator';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class TaskService {
  async saveFile(file: any, filePath: string) {
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Save file to disk
    fs.writeFileSync(filePath, file.buffer);
  }
}
