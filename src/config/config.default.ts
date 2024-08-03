import { MidwayConfig } from '@midwayjs/core';

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
} as MidwayConfig;
