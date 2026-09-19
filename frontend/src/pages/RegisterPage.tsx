import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("Ananya Krishnan");
  const [email, setEmail] = useState("ananya.krishnan@campus.edu");
  const [college, setCollege] = useState("St. Mary's College of Engineering");
  const [course, setCourse] = useState("B.Tech CSE");
  const [semester, setSemester] = useState("5");
  const [section, setSection] = useState("A");
  const [password, setPassword] = useState("demo-only");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await register({
      name,
      email,
      college,
      course,
      semester: Number(semester) || null,
      section: section || null,
      password,
    });

    if (result.ok) {
      navigate("/app", { replace: true });
      return;
    }

    setError(result.error ?? "Unable to create your account.");
    setIsSubmitting(false);
  }

  return (
    <Card>
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
        Start the semester
      </p>
      <h1 className="mt-2 font-display text-3xl">Create account</h1>
      <p className="mt-2 text-sm text-muted">
        Sign up to save your study data in Supabase and continue with your academic plan.
      </p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="college">College</Label>
            <Input id="college" required value={college} onChange={(event) => setCollege(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="course">Course</Label>
            <Input id="course" required value={course} onChange={(event) => setCourse(event.target.value)} />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="semester">Semester</Label>
            <Input id="semester" type="number" min="1" max="12" value={semester} onChange={(event) => setSemester(event.target.value)} />
          </div>
          <div>
            <Label htmlFor="section">Section</Label>
            <Input id="section" value={section} onChange={(event) => setSection(event.target.value)} />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Enter the dashboard"}
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
