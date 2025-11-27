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
import { Zap, Sun, Wind } from "lucide-react"

export default function RenewableEnergyPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Renewable Energy</h1>
                <Button>Manage Project</Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-3">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Energy Generated</CardTitle>
                        <Zap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5 MWh</div>
                        <p className="text-xs text-muted-foreground">Daily average</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Solar Capacity</CardTitle>
                        <Sun className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4 MW</div>
                        <p className="text-xs text-muted-foreground">Installed</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Wind Potential</CardTitle>
                        <Wind className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">High</div>
                        <p className="text-xs text-muted-foreground">Feasibility confirmed</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>About the Sector</CardTitle>
                            <CardDescription>
                                Facilitating the transition to green energy and sustainable industrial practices.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                The Renewable Energy sector at ELIDZ focuses on solar PV manufacturing, component assembly, and energy storage solutions. We are also exploring green hydrogen opportunities.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="projects" className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Active Projects</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-4 text-sm text-muted-foreground space-y-2">
                                <li>Rooftop Solar PV Rollout</li>
                                <li>Battery Energy Storage System (BESS) Pilot</li>
                                <li>Electric Vehicle Charging Infrastructure</li>
                                <li>Energy Efficiency Audits for Tenants</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

