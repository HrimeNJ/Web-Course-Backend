import { Controller, Post, Body } from "@midwayjs/core";

let DataStore: { [key: number]: number } = { 123456: 123456 };

@Controller('/login')
export class LoginController {
    @Post('/')
    async login(@Body() data: { email: string; password: string }) {
        const { email, password } = data;

        // 检查是否存在该邮箱的密码，并且密码匹配
        if (DataStore[email] && DataStore[email] === password) {
            return { success: true, message: 'Login success', user: { email } };
        } else {
            DataStore[email] = password;
            return { success: true, message: 'Login success', user: { email } };
            // throw new Error('Invalid email or password');
        }
    }
}
