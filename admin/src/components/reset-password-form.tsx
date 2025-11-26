import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ResetPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-2">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Securely update your password to regain access.
                </p>
            </div>

            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input id="password" type="password" required />
                </div>
                
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Reset Password
                </Button>
            </form>

            <div className="text-center text-sm">
                <Link href="/auth/login" className="inline-flex items-center text-indigo-600 hover:text-indigo-500 hover:underline font-medium">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
