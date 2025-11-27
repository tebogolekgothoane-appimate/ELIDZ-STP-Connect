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
import { FlaskConical, Users, FileText } from "lucide-react"

export default function FoodWaterLabPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Food & Water Lab</h1>
                <Button>Manage Project</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Samples</CardTitle>
                        <FlaskConical className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,284</div>
                        <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45</div>
                        <p className="text-xs text-muted-foreground">+3 new clients</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">342</div>
                        <p className="text-xs text-muted-foreground">This quarter</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>About the Lab</CardTitle>
                            <CardDescription>
                                The Food & Water Lab provides ISO accredited testing services for the food and beverage industry.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Our state-of-the-art facility offers comprehensive microbiological and chemical analysis to ensure product safety and quality compliance. We serve a diverse range of clients from local SMEs to large multinational corporations.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="services" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Testing Services</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                                <li>Water Quality Analysis (Potable & Waste)</li>
                                <li>Food Pathogen Detection</li>
                                <li>Shelf-life Studies</li>
                                <li>Nutritional Analysis</li>
                                <li>Allergen Testing</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="equipment" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Key Equipment</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                                <li>HPLC Systems</li>
                                <li>GC-MS</li>
                                <li>Incubators</li>
                                <li>Spectrophotometers</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
