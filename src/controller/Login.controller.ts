import { Provide, Controller, Post, Body, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import * as path from 'path';

let DataStore: { [key: string]: string } = {};  // 使用 string 类型的 key 和 value

@Provide()
@Controller('/login')
export class LoginController {

  @Inject()
  ctx: Context;

  constructor() {
    this.loadDataStore();  // 在初始化时加载 DataStore
  }

  @Post('/')
  async login(@Body() data: { email: string; password: string }) {
    const { email, password } = data;

    // 检查是否存在该邮箱的密码，并且密码匹配
    if(DataStore[email]){
        if (DataStore[email] === password) {
        return { success: true, message: 'Login success', user: { email } };
        }else{
        return { success: false, message: 'Password error', user: { email } };
        }
    }else {
        DataStore[email] = password;
        this.saveDataStore();  // 保存到 JSON 文件
        return { success: true, message: 'Login success', user: { email } };
    }
    
  }

  // 加载 DataStore 数据
  loadDataStore() {
    const filePath = path.join(__dirname, '../DataStore.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      DataStore = JSON.parse(fileContent);
    } else {
      this.saveDataStore();  // 如果文件不存在，创建一个空文件
    }
  }

  // 保存 DataStore 数据
  saveDataStore() {
    const filePath = path.join(__dirname, '../DataStore.json');
    fs.writeFileSync(filePath, JSON.stringify(DataStore, null, 2));
  }
}
