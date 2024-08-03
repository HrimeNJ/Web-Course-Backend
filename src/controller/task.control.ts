import { Body, Controller, Post } from "@midwayjs/core";

@Controller("/tasklist")
export class UserController {
    @Post("/create")
    public async create(@Body() data: { 
        name: string
        description: string;
        dueDate: Date; }) {
        return {
            success: true,
            message: "Task created successfully",
            data,
        };
    }
    
}