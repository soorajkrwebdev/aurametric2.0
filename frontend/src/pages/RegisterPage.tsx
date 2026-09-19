import { type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterPage() {
  const navigate = useNavigate();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/app");
  }

  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Start the semester
      </p>
      <h1 className="mt-2 font-display text-3xl">Create account</h1>
      <p className="mt-2 text-sm text-muted">
        This form is visual only. Submitting opens the demo — nothing is saved.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required defaultValue="Ananya Krishnan" autoComplete="name" />
        </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="college">College</Label>
            <Input id="college" required defaultValue="St. Mary's College of Engineering" />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input id="course" required defaultValue="B.Tech CSE" />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required defaultValue="demo-only" />
        </div>
        <Button type="submit" className="w-full">
          Enter the demo
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-muted">
        Already have a login?{" "}
        <Link to="/login" className="font-medium text-primary">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
