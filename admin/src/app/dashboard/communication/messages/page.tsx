"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"

const messages = [
    {
        id: 1,
        sender: "John Doe",
        avatar: "/avatars/01.png",
        subject: "Question about tenancy agreement",
        preview: "Hi Admin, I was wondering if we could schedule a meeting to discuss...",
        time: "10:30 AM",
        unread: true
    },
    {
        id: 2,
        sender: "Jane Smith",
        avatar: "/avatars/02.png",
        subject: "Facility Access Card",
        preview: "My access card seems to be malfunctioning at the main gate...",
        time: "Yesterday",
        unread: false
    },
    {
        id: 3,
        sender: "TechStar Inc",
        avatar: "/avatars/04.png",
        subject: "Internet Connectivity Issues",
        preview: "We are experiencing some packet loss in Zone 1B...",
        time: "2 days ago",
        unread: false
    },
]

export default function MessageCenterPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-[calc(100vh-2rem)]">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Message Center</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                {/* Sidebar / List */}
                <Card className="col-span-1 h-full flex flex-col">
                    <CardHeader className="pb-3">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-8" />
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto p-0">
                        <div className="flex flex-col">
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`flex gap-3 p-4 border-b cursor-pointer hover:bg-muted/50 ${msg.unread ? 'bg-muted/20' : ''}`}
                                >
                                    <Avatar>
                                        <AvatarImage src={msg.avatar} />
                                        <AvatarFallback>{msg.sender.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-sm ${msg.unread ? 'font-semibold' : 'font-medium'}`}>
                                                {msg.sender}
                                            </span>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                                {msg.time}
                                            </span>
                                        </div>
                                        <p className={`text-sm truncate ${msg.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                                            {msg.subject}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {msg.preview}
                                        </p>
                                    </div>
                                    {msg.unread && (
                                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Message View */}
                <Card className="col-span-1 md:col-span-2 h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                        <p>Select a message to view details</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
