import { FormEvent, useState } from "react";
import StarIcon from "./StarIcon";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import MessageIcon from "./MessageIcon";
import tailwindStyles from "../index.css?inline"
import axios from "axios";

export default function Widget(props: any) {
    const [rating, setRating] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    const onSelectStar = (index: number) => {
        setRating(index + 1)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            // Prevent page reload
            e.preventDefault()

            const formData = new FormData(e.currentTarget)

            const data = {
                projectId: props.projectId,
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                rating: rating,
                message: formData.get('message') as string,
            }

            const res = await axios.post(`http://localhost:3000/api/website/${props.projectId}/feedback`, { ...data })

            console.log(res);

            setSubmitted(true)
        } catch (error) {
            console.log('Error', error);
        }
    }
  return (
    <>
        <style>{tailwindStyles}</style>
        <div className="feedbackly-widget fixed bottom-4 right-4 z-50">
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="rounded-full">
                        <MessageIcon />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="feedbackly-widget w-96 flex flex-col items-center p-3 rounded shadow-xl bg-white mr-4 mb-4">
                    { 
                        submitted ?
                        (
                            <div>
                                <h3 className="font-bold text-lg">Thank you for your feedback!</h3>
                                <p className="mt-2">It helps us to continously improve our product so that it can better serve  the needs of our users.</p>
                            </div>
                        ) :
                        (
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold">Tell us what you think about our site</h3>

                                <form className="space-y-3" onSubmit={handleSubmit}>
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name"name="name" required placeholder="Your name" />
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="name" name="email" type="email" required placeholder="Your email" />
                                    </div>

                                    <div>
                                        <Label htmlFor="rating">Rating</Label>
                                        <div className="flex gap-1">
                                            {
                                                [...Array(5)].map((_, index) => (
                                                    <StarIcon key={index} onClick={() => onSelectStar(index)} className={`h-5 w-5 cursor-pointer ${rating > index ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`} />
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="feedback">Message</Label>
                                        <Textarea id="message" name="message" required placeholder="Your message" className="min-h-40" />
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <Button className="px-8" type="submit">Submit</Button>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                </PopoverContent>
            </Popover>
        </div>
    </>
  )
}
