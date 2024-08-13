'use client'

import axiosClient from "@/utils/axiosClient"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { Skeleton } from "../ui/skeleton"

interface Owner {
    name: string;
    email: string;
}

interface Project {
    websiteId: string;
    name: string;
    url: string;
    description: string;
    sitekey: string;
    createdAt: Date;
    updatedAt: Date;
    owner: Owner
}

export default function Instructions({ projectId }: { projectId: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [project, setProject] = useState<Project | null>(null)
    
    const fetchProjectDetails = async () => {
        try {
            setIsLoading(true)

            const { data } = await axiosClient.get(`/website/${projectId}`)

            setProject(data)
        } catch (error: any) {
            toast(error?.response?.data?.error?.message || 'Something went wrong', {
                type: 'error',
                position: 'top-center'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(projectId){
            fetchProjectDetails()
        }
    }, [projectId])
  return (
    <div>
        <h3 className='text-xl font-bold'>Start Collecting Feedback!</h3>
        <p className='text-gray-500 font-semibold'>Embed this code in your site</p>

        <div className="mt-4">
            {
                isLoading ?
                <Skeleton className="h-24 w-96 rounded-xl" /> :
                <div className="bg-gray-800 text-white w-fit py-2 px-4 rounded flex flex-col space-y-2">
                    <code>{`<feedbackly-widget project-id="${project?.sitekey}"></feedbackly-widget>`}</code>
                    <code>{`<script src="https://feedbackly-widget.vercel.app/feedbackly-widget.umd.js"></script>`}</code>
                </div>
            }
        </div>
    </div>
  )
}
