import { type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/app");
  }

  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Welcome back
      </p>
      <h1 className="mt-2 font-display text-3xl">Log in</h1>
      <p className="mt-2 text-sm text-muted">
        Accounts are not live yet. Use any email to open the demo workspace.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Campus email</Label>
          <Input
            id="email"
            type="email"
            required
            defaultValue="ananya.krishnan@campus.edu"
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            defaultValue="demo-only"
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" className="w-full">
          Continue to demo
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">
        New here?{" "}
        <Link to="/register" className="font-medium text-primary">
          Create an account
        </Link>
      </p>
    </Card>
  );
}
