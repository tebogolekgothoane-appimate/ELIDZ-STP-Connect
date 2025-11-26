import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-2">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your credentials to access the admin portal.
                </p>
            </div>
            
            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="admin@elidz.co.za" required />
                </div>
                
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/auth/forgot-password" className="ml-auto text-sm text-indigo-600 hover:text-indigo-500 hover:underline">
                            Forgot your password?
                        </Link>
                    </div>
                    <Input id="password" type="password" required />
                </div>
                
                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Sign in
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 hover:underline font-medium">
                    Contact Super Admin
                </Link>
            </div>
        </div>
    );
}
