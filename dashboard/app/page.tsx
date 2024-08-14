'use client'

import Hero from "@/components/landing/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const user = useUserStore(state => state.user)
  return (
    <div className="">
      {/* Nav */}
      <header className='p-4 flex justify-between items-center shadow mb-4'>        
        <Link href={'/'} className='font-bold text-2xl'>Feedbackly</Link>

        {
          user ?
          <Link href={'/dashboard'}>
            <Button className="flex items-center gap-2">
              <span>Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button> 
          </Link> :
          <Link href={'/signin'}>
            <Button>
              Get Started
            </Button> 
          </Link> 
        }
      </header>

      {/* Hero */}
      <div className="flex flex-col space-y-12 items-center sm:flex-row sm:justify-around sm:py-12 sm:items-center">
        <div className="w-fit">
          <div className="w-fit space-y-1">
            <h1 className="text-3xl sm:text-5xl font-bold">Collect feedback</h1>
            <h1 className="text-3xl sm:text-5xl font-bold">form your users</h1>
            <h1 className="text-3xl sm:text-5xl font-bold">easily</h1>
          </div>
          <div className="mt-4 text-gray-500">
            <p>Embed a feedback form on your website</p>
            <p>and start collecting feedback today!</p>
          </div>
        </div>

        <div className='w-96'>
         <Hero />
        </div>
      </div>

      {/* Features */}
      <div className="mt-12">
        <h3 className="text-3xl text-center font-bold">Features</h3>

        <div className="mt-4 flex flex-col gap-4 items-center sm:flex-row sm:flex-wrap sm:justify-around sm:items-center">
          <Card className="w-96 h-48">
            <CardHeader>
              <CardTitle>Embeddable Form</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Integrate the feedback form into any website with a simple script.</p>
            </CardContent>
          </Card>

          <Card className="w-96 h-48">
            <CardHeader>
              <CardTitle>Centralized Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Access all feedback in one place, manage responses, and gain insights into user sentiment.</p>
            </CardContent>
          </Card>

          <Card className="w-96 h-48">
            <CardHeader>
              <CardTitle>Guaranteed Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Each feedback form is secured with a unique key associated with the website URL to prevent spam and unauthorized submissions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
