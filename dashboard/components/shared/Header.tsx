import { ReactNode } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { FolderRoot, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { useUserStore } from '@/store/user'

export default function Header(): ReactNode {
    const logout = useUserStore((state) => state.logout)

    const handleLogout = async () => {
        logout()
    }

  return (
    <header className='p-4 flex justify-between items-center shadow mb-4'>
        <h1 className='font-bold text-2xl'>Feedbackly</h1>

        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
                <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=''>
                <DropdownMenuItem asChild>
                    <Link href={'/dashboard'} className='flex items-center gap-2'>
                        <FolderRoot className='w-4 h-4' />
                        <span>Projects</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                    <button onClick={() => handleLogout()} className='flex items-center gap-2'>
                        <LogOut className='w-4 h-4' />
                        <span>Log out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </header>
  )
}
