import { IsOptional, IsString, IsUrl } from "class-validator";

export class CreateWebsiteDto {
    @IsString()
    name: string;

    @IsString()
    @IsUrl()
    url: string;

    @IsString()
    @IsOptional()
    description: string;
}
