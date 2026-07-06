-- Run this in the Supabase SQL editor once you've created a project
-- and dropped your real VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY into .env

create table if not exists progress (
  user_id uuid references auth.users not null,
  language text not null,
  completed_days int[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, language)
);

alter table progress enable row level security;

-- Needed if the project was created with "Automatically expose new tables"
-- turned off: the Data API only serves tables the anon/authenticated roles
-- have been explicitly granted access to. RLS policies below still govern
-- which *rows* each user can see, regardless of this grant.
grant usage on schema public to anon, authenticated;
grant select, insert, update on progress to authenticated;

create policy "Users can read own progress"
  on progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on progress for update
  using (auth.uid() = user_id);
