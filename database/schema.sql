create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  college text,
  course text,
  semester integer,
  section text,
  profile_image text,
  created_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  name text not null,
  code text,
  semester integer,
  created_at timestamptz not null default now(),
  constraint subjects_user_fk foreign key (user_id) references auth.users(id) on delete cascade
);

create table if not exists public.homework (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  subject_id uuid,
  title text not null,
  description text,
  due_date date,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'not-started' check (status in ('not-started', 'in-progress', 'submitted', 'late')),
  created_at timestamptz not null default now(),
  constraint homework_user_fk foreign key (user_id) references auth.users(id) on delete cascade,
  constraint homework_subject_fk foreign key (subject_id) references public.subjects(id) on delete set null
);

create table if not exists public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  subject_id uuid,
  topic text not null,
  study_date date not null,
  duration integer not null check (duration > 0),
  notes text,
  created_at timestamptz not null default now(),
  constraint study_sessions_user_fk foreign key (user_id) references auth.users(id) on delete cascade,
  constraint study_sessions_subject_fk foreign key (subject_id) references public.subjects(id) on delete set null
);

create table if not exists public.exams (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  subject_id uuid,
  exam_date date not null,
  exam_type text not null check (exam_type in ('internal', 'lab', 'end-semester')),
  notes text,
  created_at timestamptz not null default now(),
  constraint exams_user_fk foreign key (user_id) references auth.users(id) on delete cascade,
  constraint exams_subject_fk foreign key (subject_id) references public.subjects(id) on delete set null
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  task_title text not null,
  status text not null default 'open' check (status in ('open', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date date,
  created_at timestamptz not null default now(),
  constraint tasks_user_fk foreign key (user_id) references auth.users(id) on delete cascade
);

create table if not exists public.hobbies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  hobby_name text not null,
  hours_spent numeric(4,1) not null default 0,
  date date not null,
  notes text,
  created_at timestamptz not null default now(),
  constraint hobbies_user_fk foreign key (user_id) references auth.users(id) on delete cascade
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  message text not null,
  type text not null default 'system' check (type in ('homework', 'exam', 'planner', 'system')),
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  constraint notifications_user_fk foreign key (user_id) references auth.users(id) on delete cascade
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (role in ('user', 'assistant')),
  message text not null,
  created_at timestamptz not null default now(),
  constraint chat_messages_user_fk foreign key (user_id) references auth.users(id) on delete cascade
);

create or replace function public.set_owning_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.user_id = auth.uid();
  return new;
end;
$$;

create or replace function public.set_profile_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.id = auth.uid();
  if new.email is null then
    new.email = auth.jwt()->>'email';
  end if;
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    name,
    email,
    college,
    course,
    semester,
    section,
    profile_image
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.email,
    new.raw_user_meta_data ->> 'college',
    new.raw_user_meta_data ->> 'course',
    nullif(new.raw_user_meta_data ->> 'semester', '')::integer,
    new.raw_user_meta_data ->> 'section',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set
    name = coalesce(excluded.name, public.profiles.name),
    email = coalesce(excluded.email, public.profiles.email),
    college = coalesce(excluded.college, public.profiles.college),
    course = coalesce(excluded.course, public.profiles.course),
    semester = coalesce(excluded.semester, public.profiles.semester),
    section = coalesce(excluded.section, public.profiles.section),
    profile_image = coalesce(excluded.profile_image, public.profiles.profile_image);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger profiles_set_owner
  before insert or update on public.profiles
  for each row execute procedure public.set_profile_owner();

create trigger subjects_set_owner
  before insert or update on public.subjects
  for each row execute procedure public.set_owning_user();

create trigger homework_set_owner
  before insert or update on public.homework
  for each row execute procedure public.set_owning_user();

create trigger study_sessions_set_owner
  before insert or update on public.study_sessions
  for each row execute procedure public.set_owning_user();

create trigger exams_set_owner
  before insert or update on public.exams
  for each row execute procedure public.set_owning_user();

create trigger tasks_set_owner
  before insert or update on public.tasks
  for each row execute procedure public.set_owning_user();

create trigger hobbies_set_owner
  before insert or update on public.hobbies
  for each row execute procedure public.set_owning_user();

create trigger notifications_set_owner
  before insert or update on public.notifications
  for each row execute procedure public.set_owning_user();

create trigger chat_messages_set_owner
  before insert or update on public.chat_messages
  for each row execute procedure public.set_owning_user();

alter table public.profiles enable row level security;
alter table public.subjects enable row level security;
alter table public.homework enable row level security;
alter table public.study_sessions enable row level security;
alter table public.exams enable row level security;
alter table public.tasks enable row level security;
alter table public.hobbies enable row level security;
alter table public.notifications enable row level security;
alter table public.chat_messages enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy "profiles_delete_own" on public.profiles
  for delete using (id = auth.uid());

create policy "subjects_select_own" on public.subjects
  for select using (user_id = auth.uid());

create policy "subjects_insert_own" on public.subjects
  for insert with check (user_id = auth.uid());

create policy "subjects_update_own" on public.subjects
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "subjects_delete_own" on public.subjects
  for delete using (user_id = auth.uid());

create policy "homework_select_own" on public.homework
  for select using (user_id = auth.uid());

create policy "homework_insert_own" on public.homework
  for insert with check (user_id = auth.uid());

create policy "homework_update_own" on public.homework
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "homework_delete_own" on public.homework
  for delete using (user_id = auth.uid());

create policy "study_sessions_select_own" on public.study_sessions
  for select using (user_id = auth.uid());

create policy "study_sessions_insert_own" on public.study_sessions
  for insert with check (user_id = auth.uid());

create policy "study_sessions_update_own" on public.study_sessions
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "study_sessions_delete_own" on public.study_sessions
  for delete using (user_id = auth.uid());

create policy "exams_select_own" on public.exams
  for select using (user_id = auth.uid());

create policy "exams_insert_own" on public.exams
  for insert with check (user_id = auth.uid());

create policy "exams_update_own" on public.exams
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "exams_delete_own" on public.exams
  for delete using (user_id = auth.uid());

create policy "tasks_select_own" on public.tasks
  for select using (user_id = auth.uid());

create policy "tasks_insert_own" on public.tasks
  for insert with check (user_id = auth.uid());

create policy "tasks_update_own" on public.tasks
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "tasks_delete_own" on public.tasks
  for delete using (user_id = auth.uid());

create policy "hobbies_select_own" on public.hobbies
  for select using (user_id = auth.uid());

create policy "hobbies_insert_own" on public.hobbies
  for insert with check (user_id = auth.uid());

create policy "hobbies_update_own" on public.hobbies
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "hobbies_delete_own" on public.hobbies
  for delete using (user_id = auth.uid());

create policy "notifications_select_own" on public.notifications
  for select using (user_id = auth.uid());

create policy "notifications_insert_own" on public.notifications
  for insert with check (user_id = auth.uid());

create policy "notifications_update_own" on public.notifications
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "notifications_delete_own" on public.notifications
  for delete using (user_id = auth.uid());

create policy "chat_messages_select_own" on public.chat_messages
  for select using (user_id = auth.uid());

create policy "chat_messages_insert_own" on public.chat_messages
  for insert with check (user_id = auth.uid());

create policy "chat_messages_update_own" on public.chat_messages
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "chat_messages_delete_own" on public.chat_messages
  for delete using (user_id = auth.uid());

create index if not exists idx_subjects_user_id on public.subjects (user_id);
create index if not exists idx_homework_user_id on public.homework (user_id);
create index if not exists idx_homework_subject_id on public.homework (subject_id);
create index if not exists idx_homework_due_date on public.homework (due_date);
create index if not exists idx_study_sessions_user_id on public.study_sessions (user_id);
create index if not exists idx_study_sessions_subject_id on public.study_sessions (subject_id);
create index if not exists idx_study_sessions_study_date on public.study_sessions (study_date);
create index if not exists idx_exams_user_id on public.exams (user_id);
create index if not exists idx_exams_subject_id on public.exams (subject_id);
create index if not exists idx_exams_exam_date on public.exams (exam_date);
create index if not exists idx_tasks_user_id on public.tasks (user_id);
create index if not exists idx_tasks_due_date on public.tasks (due_date);
create index if not exists idx_hobbies_user_id on public.hobbies (user_id);
create index if not exists idx_hobbies_date on public.hobbies (date);
create index if not exists idx_notifications_user_id on public.notifications (user_id);
create index if not exists idx_notifications_is_read on public.notifications (user_id, is_read);
create index if not exists idx_chat_messages_user_id on public.chat_messages (user_id);
create index if not exists idx_chat_messages_created_at on public.chat_messages (created_at desc);
