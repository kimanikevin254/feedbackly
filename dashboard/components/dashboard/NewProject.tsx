import { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import CreateProjectForm from './CreateProjectForm'

  
export default function NewProject(): ReactNode {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button>New Project</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
            </DialogHeader>

            <CreateProjectForm />
        </DialogContent>
    </Dialog>
  )
}
