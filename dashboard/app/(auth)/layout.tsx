'use client'

import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className='max-w-screen-sm mx-auto'>
        { children }
    </div>
  )
}