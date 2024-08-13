'use client'

import axiosClient from '@/utils/axiosClient'
import { ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"  
import { Button } from '../ui/button'
import { SkeletonCard } from './SkeletonCard'
import Link from 'next/link'

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

export default function ProjectsList(): ReactNode {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [projects, setProjects] = useState<Project[] | null>(null)
    
    const fetchProjects = async () => {
        try {
            setIsLoading(true)

            const { data } = await axiosClient.get(`/website`)

            setProjects(data)
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
        fetchProjects()
    }, [])
  return (
    <div className='mt-4 flex flex-row gap-6 flex-wrap'>
        {
            isLoading ?
            [1,2,3,4].map((val, i) => (
                <SkeletonCard key={i} />
            )) :
            (
                projects && projects.map(({ websiteId, name, description }) => (
                    <Card key={websiteId} className='w-96'>
                        <CardHeader>
                            <CardTitle>{name.length > 57 ? name.slice(0, 57) + '...' : name}</CardTitle>
                            <CardDescription>{description ? (description.length > 137 ? description.slice(0, 137) + '...' : description) : <p className='italic'>No description</p>}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/dashboard/projects/${websiteId}`}>
                                <Button>View Project</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))
            )
        }
    </div>
  )
}
