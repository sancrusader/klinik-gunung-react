import { Label } from "@/Components/ui/label"
import { Input } from "@/Components/ui/input"
import { Textarea } from "@/Components/ui/textarea"
import { Button } from "@/Components/ui/button"
import Header from "@/Layouts/Header"
import { Head } from "@inertiajs/react"

export default function Contact() {
  return (
    <Header>
        <Head title="Contact"/>
        <main className="w-full max-w-3xl mx-auto px-4 py-12 md:py-20">
            <div className="space-y-6">
                <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact</h1>
                <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto">
                    Have a question or want to work together? Fill out the form below or reach out to us on social media.
                </p>
                </div>
                <form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                    </div>
                </div>
                <div className="space-y-1">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                    Send Message
                </Button>
                </form>
            </div>
        </main>
    </Header>
  )
}
