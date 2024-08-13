'use client'

import Header from '@/components/shared/Header'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import GridLoader from 'react-spinners/GridLoader'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { _hasHydrated, accessToken } = useUserStore(
    useShallow(state => ({
      _hasHydrated: state._hasHydrated,
      accessToken: state.accessToken
    }))
  )

  const router = useRouter()

  useEffect(() => {
    if( _hasHydrated && !accessToken){
      return router.replace('/signin')
    }
  }, [_hasHydrated, accessToken])

  if(!_hasHydrated){ return <div className='w-full h-screen flex items-center justify-center'>
    <GridLoader />
  </div> }
  
  return (
    _hasHydrated && accessToken &&
    <div>
      <Header />
      <div className='px-4'>
        { children }
      </div>
    </div> 
  )
}
