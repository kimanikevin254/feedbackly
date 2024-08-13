'use client'

import axiosClient from '@/utils/axiosClient'
import { ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Feedback({ projectId }: { projectId: string }): ReactNode {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedback, setFeedBack] = useState(null)


    const fetchProjectFeedback = async () => {
        try {
            setIsLoading(true)
            
            const { data } = await axiosClient.get(`/website/${projectId}/feedback`)

            console.log(data);
        } catch (error: any) {
            toast(error?.response?.data?.error?.message || 'Something went wrong', {
                type: 'error',
                position: 'top-center'
            })
        } finally {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        if(projectId) { fetchProjectFeedback() }
    }, [projectId])
  return (
    <div>Feedback {projectId}</div>
  )
}
