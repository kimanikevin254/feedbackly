// This guard should make sure that the feedback is coming from the correct website

import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CreateFeedbackGuard implements CanActivate {
    constructor(
        private prismaService: PrismaService
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest()

        // To make sure that the request is coming from the correct website:
        // Extract the value of origin header from the request
        // Extract the value of the project ID from request body
        // Check if there is a website in the DB with a matching origin(website url) and project ID(site key)

        const origin = request.headers.origin
        const projectId = request.body?.projectId

        if(origin && projectId){
            return this.validateRequest(origin, projectId)
        }

        return false
    }

    private async validateRequest(origin: string, projectId: string): Promise<boolean>{
        try {
            const website = await this.prismaService.website.findFirst({
                where: {
                    url: origin,
                    sitekey: projectId
                }
            })

            if(website) { return true }

            return false
        } catch (error) {
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}