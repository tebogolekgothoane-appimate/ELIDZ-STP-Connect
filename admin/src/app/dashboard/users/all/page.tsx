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
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const users = [
    {
        id: "USR-001",
        name: "John Doe",
        email: "john@example.com",
        role: "Tenant",
        status: "Active",
        company: "Acme Corp",
        lastActive: "2024-03-10",
        avatar: "/avatars/01.png"
    },
    {
        id: "USR-002",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Admin",
        status: "Active",
        company: "ELIDZ",
        lastActive: "2024-03-11",
        avatar: "/avatars/02.png"
    },
    {
        id: "USR-003",
        name: "Robert Johnson",
        email: "robert@example.com",
        role: "Investor",
        status: "Inactive",
        company: "Invest Co.",
        lastActive: "2024-02-28",
        avatar: "/avatars/03.png"
    },
    {
        id: "USR-004",
        name: "Emily Davis",
        email: "emily@example.com",
        role: "Tenant",
        status: "Pending",
        company: "TechStar",
        lastActive: "-",
        avatar: "/avatars/04.png"
    },
    {
        id: "USR-005",
        name: "Michael Brown",
        email: "michael@example.com",
        role: "Tenant",
        status: "Active",
        company: "BuildIt",
        lastActive: "2024-03-09",
        avatar: "/avatars/05.png"
    },
]

export default function AllUsersPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">All Users</h1>
                <Button>Add User</Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableCaption>A list of all registered users.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Avatar</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.company}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Badge variant={user.status === "Active" ? "default" : user.status === "Pending" ? "secondary" : "destructive"}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                                                Copy user ID
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Edit user</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
