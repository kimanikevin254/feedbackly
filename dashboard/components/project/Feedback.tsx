'use client'

import axiosClient from '@/utils/axiosClient';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Skeleton } from '../ui/skeleton';
import { ColumnDef } from "@tanstack/react-table";
import FeedbackTable from './FeedbackTable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
  

interface Website {
    name: string;
    url: string;
}

interface Feedback {
    feedbackId: string;
    name: string;
    email: string;
    rating: number;
    message: string;
    createdAt: Date
    website: Website;
}

const columns: ColumnDef<Feedback>[] = [
    {
        accessorKey: 'createdAt',
        header: 'Submitted On',
        cell: ({ row }) => {
            const createdAt: Date = row.getValue('createdAt')

            return <div>{new Date(createdAt).toLocaleString()}</div>
        }
    },
    {
        accessorKey: 'name',
        header: 'Name'
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        accessorKey: 'rating',
        header: 'Rating'
    }, 
    {
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
            const { message, name, email } = row.original

            return (
                <Dialog>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <DialogTrigger asChild>
                            <DropdownMenuItem>View Message</DropdownMenuItem>
                        </DialogTrigger>
                    </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Message</DialogTitle>
                        <DialogDescription>
                            From {name} ({email})
                        </DialogDescription>
                        </DialogHeader>
                        
                        <p>{message}</p>

                    </DialogContent>
                </Dialog>

            )
        }
    }
]

export default function Feedback({ projectId }: { projectId: string }): ReactNode {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [feedback, setFeedBack] = useState<Feedback[] | null>(null)


    const fetchProjectFeedback = async () => {
        try {
            setIsLoading(true)
            
            const { data } = await axiosClient.get(`/website/${projectId}/feedback`)

            setFeedBack(data)
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
        if(projectId) { fetchProjectFeedback() }
    }, [projectId])

    if(isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />

  return (
    feedback && <FeedbackTable columns={columns} data={feedback} />
  )
}
