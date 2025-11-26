import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export function OTPForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 mb-2">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Verify OTP</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter the one-time password sent to your email.
                </p>
            </div>

            <form className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <div className="flex gap-2 justify-center">
                        {/* A simple input for now, could be enhanced with an OTP input component */}
                        <Input id="otp" type="text" placeholder="123456" className="text-center tracking-widest text-lg" required maxLength={6} />
                    </div>
                </div>

                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Verify
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
                Didn&apos;t receive the code?{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500 hover:underline font-medium">
                    Resend
                </a>
            </div>
        </div>
    );
}
