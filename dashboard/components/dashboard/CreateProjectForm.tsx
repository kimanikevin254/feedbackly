'use client'

import axiosClient from "@/utils/axiosClient"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const createProjectFormSchema = z.object({
    name: z.string().min(5, 'Project name must be at least 5 characters'),
    url: z.string().url('Must be a valid URL'),
    description: z.string().optional()
})

export default function CreateProjectForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const form = useForm<z.infer<typeof createProjectFormSchema>>({
        resolver: zodResolver(createProjectFormSchema),
        defaultValues: {
            name: '',
            url: '',
            description: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof createProjectFormSchema>) => {
        try {
            setIsLoading(true)

            const { data } = await axiosClient.post('/website', values)

            if(data.websiteId){
                return router.push(`/dashboard/projects/${data.websiteId}`)
            }
        } catch (error: any) {
            console.log(error)
            toast(error?.response?.data?.error?.message || 'Something went wrong', {
                type: 'error',
                position: 'top-center'
            })
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <Form { ...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField 
                control={form.control}  
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Project name" {...field} className="" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}  
            /> 

            <FormField 
                control={form.control}  
                name="url"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                        <Input placeholder="https://www.example.com" {...field} className="" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}  
            /> 

            <FormField 
                control={form.control}  
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Project description" {...field} className="h-32" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}  
            /> 

            <div className="flex items-center justify-center">
                <Button type="submit" disabled={isLoading} className="px-8 mt-4">{ isLoading ? 'Creating...' : 'Create Project' }</Button>
            </div> 
        </form>
    </Form>
  )
}
