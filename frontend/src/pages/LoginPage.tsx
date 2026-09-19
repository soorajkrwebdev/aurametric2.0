import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("ananya.krishnan@campus.edu");
  const [password, setPassword] = useState("demo-only");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login({ email, password });

    if (result.ok) {
      navigate("/app", { replace: true });
      return;
    }

    setError(result.error ?? "Unable to log in. Please try again.");
    setIsSubmitting(false);
  }

  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Welcome back
      </p>
      <h1 className="mt-2 font-display text-3xl">Log in</h1>
      <p className="mt-2 text-sm text-muted">
        Access your study workspace with your campus email and password.
      </p>
      <p className="mt-3 rounded-xl bg-primary-soft px-3 py-2 text-xs text-primary">
        Demo account: ananya.krishnan@campus.edu / demo-only
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Campus email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Continue to dashboard"}
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
