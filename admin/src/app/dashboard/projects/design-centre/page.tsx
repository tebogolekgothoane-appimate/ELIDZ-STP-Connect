"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenTool, Users, Layout } from "lucide-react"

export default function DesignCentrePage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Design Centre</h1>
                <Button>Manage Project</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projects Completed</CardTitle>
                        <Layout className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87</div>
                        <p className="text-xs text-muted-foreground">Year to date</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Designers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Full-time & Contract</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prototyping Hours</CardTitle>
                        <PenTool className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,450</div>
                        <p className="text-xs text-muted-foreground">Machine time</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>About the Centre</CardTitle>
                            <CardDescription>
                                A hub for creative design, prototyping, and product development support.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                The Design Centre offers advanced CAD/CAM services, 3D printing, and rapid prototyping facilities to help innovators bring their ideas to life. We support the entire product development lifecycle from concept to manufacturing.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="capabilities" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Our Capabilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                                <li>Industrial Design & Styling</li>
                                <li>Mechanical Engineering Design</li>
                                <li>Rapid Prototyping (SLA, FDM, SLS)</li>
                                <li>Reverse Engineering</li>
                                <li>Small Batch Manufacturing</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
