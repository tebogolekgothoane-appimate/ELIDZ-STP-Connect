"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const registrations = [
    {
        id: "REG-001",
        name: "Alice Walker",
        email: "alice@startup.com",
        company: "Startup One",
        date: "2024-03-12",
        type: "Tenant Application"
    },
    {
        id: "REG-002",
        name: "David Green",
        email: "david@greenenergy.com",
        company: "Green Energy Solutions",
        date: "2024-03-12",
        type: "Investor Inquiry"
    },
    {
        id: "REG-003",
        name: "Sarah White",
        email: "sarah@design.co",
        company: "Design Co",
        date: "2024-03-11",
        type: "Tenant Application"
    },
]

export default function RegistrationsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <h1 className="text-2xl font-bold tracking-tight">Pending Registrations</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Registration ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registrations.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.id}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{reg.name}</span>
                                        <span className="text-xs text-muted-foreground">{reg.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{reg.company}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{reg.type}</Badge>
                                </TableCell>
                                <TableCell>{reg.date}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50">
                                            <Check className="h-4 w-4" />
                                            <span className="sr-only">Approve</span>
                                        </Button>
                                        <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Reject</span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
