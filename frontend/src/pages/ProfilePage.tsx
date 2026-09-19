import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { profileService } from "@/services/profileService";

export function ProfilePage() {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: profileService.get,
  });

  const initials =
    profile?.name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "ST";

  if (isLoading) {
    return <Card className="mx-auto max-w-3xl p-6 text-sm text-muted">Loading profile…</Card>;
  }

  if (error || !profile) {
    return <Card className="mx-auto max-w-3xl p-6 text-sm text-red-600">Unable to load profile.</Card>;
  }

  const fields = [
    ["Name", profile.name ?? "Student"],
    ["Email", profile.email ?? "No email on file"],
    ["College", profile.college ?? "—"],
    ["Course", profile.course ?? "—"],
    ["Semester", profile.semester ? `Semester ${profile.semester}` : "—"],
    ["Section", profile.section ?? "—"],
  ] as const;

  return (
    <div className="mx-auto max-w-3xl min-w-0">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Your authenticated student account from Supabase and the backend API."
        action={
          <Link to="/app/settings">
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </Link>
        }
      />
      <Card>
        <div className="flex flex-col items-start gap-5 sm:flex-row">
          <div className="grid size-24 place-items-center rounded-[1.75rem] bg-[linear-gradient(145deg,#5b4bff,#8f84ff)] text-2xl font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-2xl">{profile.name ?? "Student"}</p>
            <p className="text-sm text-muted">{profile.email ?? "No email on file"}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-canvas px-3 py-3">
                  <p className="text-xs text-muted">{label}</p>
                  <p className="mt-1 font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
