import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as crossDomain from '@midwayjs/cross-domain'; 
import * as ws from '@midwayjs/ws'; 
import * as bodyParser from 'koa-bodyparser'; 
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as upload from '@midwayjs/upload';

@Configuration({
  imports: [
    koa,
    crossDomain,
    upload, 
    ws,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // 使用 bodyParser 中间件处理JSON请求体
    this.app.use(bodyParser());

    // 添加上传中间件
    this.app.useMiddleware([ReportMiddleware]);

    // 添加其他中间件
    // 如果有其他的配置，可以继续添加
  }
}
