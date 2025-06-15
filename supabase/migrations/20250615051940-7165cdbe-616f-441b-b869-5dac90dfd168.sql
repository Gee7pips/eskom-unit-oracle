
-- Create a profiles table to store user profile data
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text unique,
  first_name text,
  last_name text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Automatically create a profile entry when a new user is created
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_profile();

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Each user can select/update their own profile
create policy "Users can read their own profile" on public.profiles
for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
for update using (auth.uid() = id);

create policy "Users can insert their own profile" on public.profiles
for insert with check (auth.uid() = id);
