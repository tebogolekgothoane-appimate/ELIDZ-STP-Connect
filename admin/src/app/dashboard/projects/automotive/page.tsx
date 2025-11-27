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
import { Car, Wrench, Factory } from "lucide-react"

export default function AutomotivePage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Automotive & Mfg</h1>
                <Button>Manage Project</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Production Volume</CardTitle>
                        <Factory className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120k</div>
                        <p className="text-xs text-muted-foreground">Units per year (Cluster)</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Skills Training</CardTitle>
                        <Wrench className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">450</div>
                        <p className="text-xs text-muted-foreground">Trainees certified</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Investments</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R 2.5B</div>
                        <p className="text-xs text-muted-foreground">Projected pipeline</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="incubator">Incubator</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>About the Cluster</CardTitle>
                            <CardDescription>
                                Supporting the growth and competitiveness of the automotive manufacturing sector.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Our Automotive & Manufacturing cluster focuses on enhancing supply chain localization, improving operational efficiency, and upskilling the workforce to meet the demands of Industry 4.0.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="incubator" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Automotive Incubator</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                The incubator provides support for black-owned suppliers to enter the automotive value chain through mentorship, access to markets, and technical standards compliance.
                            </p>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                                <li>Supplier Development Programmes</li>
                                <li>Quality Management Systems (ISO/IATF)</li>
                                <li>Lean Manufacturing Training</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
