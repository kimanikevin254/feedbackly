'use client'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUserStore } from "@/store/user"
import axiosClient from "@/utils/axiosClient"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
import { useShallow } from "zustand/react/shallow"

const signupFormSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .refine((value) => value.trim().split(/\s+/).length >= 2, {
      message: "Please enter at least two names",
    }),
  email: z.string().email('Must be a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setAccessToken, setUser } = useUserStore(
    useShallow(state => ({
      setAccessToken: state.setAccessToken,
      setUser: state.setUser
    }))
  )

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      setIsLoading(true)

      const { data } = await axiosClient.post('/auth/register', values)

      setAccessToken(data.access_token)

      const { data: userData } = await axiosClient.get('/users/me')

      setUser(userData)

      router.replace('/dashboard')

    } catch (error: any) {
      toast(error?.response?.data?.error?.message || 'Something went wrong', {
        type: 'error',
        position: 'top-center'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-xl font-bold text-center my-4">Create Account</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField 
          control={form.control}  
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}  
        /> 
        
        <FormField 
          control={form.control}  
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}  
        /> 

        <FormField 
          control={form.control}  
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} className="" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}  
        /> 

        <div className="flex items-center justify-center gap-1">
          <p>Already have an account?</p>
          <Link href={'/signin'} className="underline">Sign in</Link>
        </div> 

        <div className="flex items-center justify-center">
          <Button type="submit" disabled={isLoading} className="px-8 mt-4">{ isLoading ? 'Loading...' : 'Sign Up' }</Button>
        </div>   
      </form>
    </Form>
  )
}
