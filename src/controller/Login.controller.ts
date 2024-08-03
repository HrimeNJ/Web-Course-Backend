import { Controller, Post, Body } from "@midwayjs/core";

@Controller('/login')
export class LoginController{
    @Post('/')
    async login(@Body() data: { email: string; password: string }) {
        const {email, password} = data;

        if(email === '123456' && password === '123456'){
        return { success: true, message: 'Login success', user: { email } };
        }else {
        throw new Error('Invalid email or password');
        }
    }
}

