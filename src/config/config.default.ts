import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721548122497_3596',
  koa: {
    port: 7001,
  },
  crossDomain: {
    enable: true,
    // 允许哪些源访问。可以设置为 '*' 来允许所有源访问。
    origin: '*', 
    // 允许的方法
    methods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    whitelist: ['.png', '.jpg', '.jpeg', '.pdf', '.txt', '.xml', '.xlsx', '.doc', '.docx', '.ppt'], // 设置允许上传的文件类型
    tmpdir: join(__dirname, '../../uploads/tmp'), // 临时文件存放路径
    cleanTimeout: 5 * 60 * 1000, // 清理临时文件的间隔时间
    base64: false,
    // 可以根据需要添加以下配置，禁用文件名验证（注意风险）
    ignoreFieldName: true, // 忽略文件名验证
  },
} as MidwayConfig;
