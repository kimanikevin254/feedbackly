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

const signinFormSchema = z.object({
  email: z.string().email('Must be a valid email'),
  password: z.string().min(1, 'Password is required')
})

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setAccessToken, setUser } = useUserStore(
    useShallow(state => ({
      setAccessToken: state.setAccessToken,
      setUser: state.setUser
    }))
  )

  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof signinFormSchema>) => {
    try {
      setIsLoading(true)

      const { data } = await axiosClient.post('/auth/login', values)

      setAccessToken(data.access_token)

      const { data: userData } = await axiosClient.get('/users/me')

      setUser(userData)

      router.replace('/dashboard')

    } catch (error) {
      toast('Incorrect credentials', {
        type: 'error',
        position: 'top-center'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <h2 className="text-xl font-bold text-center my-4">Welcome back!</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
          <p>No account?</p>
          <Link href={'/signup'} className="underline">Sign up</Link>
        </div> 

        <div className="flex items-center justify-center">
          <Button type="submit" disabled={isLoading} className="px-8 mt-4">{ isLoading ? 'Loading...' : 'Sign In' }</Button>
        </div>   
      </form>
    </Form>
  )
}
