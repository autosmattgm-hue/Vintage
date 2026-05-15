"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    const payload = (await response.json()) as { user?: { role?: string } };

    if (!response.ok) {
      setStatus("error");
      return;
    }

    const nextPath = searchParams.get("next");
    const destination =
      mode === "register" ? "/account?welcome=true" : nextPath ?? (payload.user?.role === "admin" ? "/admin" : "/account");

    router.push(destination);
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 rounded-md border bg-card p-6 shadow-sm">
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="email" name="email" type="email" required autoComplete="email" className="pl-10" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="pl-10"
            />
          </div>
        </div>
        {status === "error" && <p className="text-sm text-destructive">Please check your email and password.</p>}
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Securing session..." : mode === "login" ? "Login" : "Create account"}
        </Button>
      </div>
    </form>
  );
}
