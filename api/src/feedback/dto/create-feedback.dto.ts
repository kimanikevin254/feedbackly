import { IsEmail, IsString } from "class-validator";

export class CreateFeedbackDto {
    @IsString()
    projectId: string;
    
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    message: string;
}
