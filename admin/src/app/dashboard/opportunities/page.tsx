"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const opportunities = [
    {
        id: "OPP-001",
        title: "Innovation Challenge 2024",
        description: "Seeking innovative solutions for renewable energy storage in the automotive sector.",
        type: "Challenge",
        status: "Open",
        deadline: "2024-04-15",
        location: "East London IDZ",
        applicants: 12
    },
    {
        id: "OPP-002",
        title: "Supplier Development Programme",
        description: "Training and development program for local manufacturing SMEs.",
        type: "Program",
        status: "Active",
        deadline: "2024-05-01",
        location: "Science & Tech Park",
        applicants: 45
    },
    {
        id: "OPP-003",
        title: "ICT Infrastructure Tender",
        description: "Provision of high-speed fiber optic network maintenance services.",
        type: "Tender",
        status: "Closed",
        deadline: "2024-02-28",
        location: "Zone 1A",
        applicants: 8
    },
    {
        id: "OPP-004",
        title: "Green Tech Fund",
        description: "Funding opportunity for startups working on sustainable technologies.",
        type: "Funding",
        status: "Open",
        deadline: "2024-06-30",
        location: "Remote",
        applicants: 23
    },
]

export default function OpportunitiesPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Opportunities</h1>
                <Button asChild>
                    <Link href="/dashboard/opportunities/create">Post Opportunity</Link>
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {opportunities.map((opp) => (
                    <Card key={opp.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <Badge variant={opp.status === "Open" || opp.status === "Active" ? "default" : "secondary"}>
                                    {opp.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{opp.type}</span>
                            </div>
                            <CardTitle className="mt-2 line-clamp-1">{opp.title}</CardTitle>
                            <CardDescription className="line-clamp-2">
                                {opp.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Deadline: {opp.deadline}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{opp.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>{opp.applicants} Applicants</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">View Details</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
