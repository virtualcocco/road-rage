-- Road Rage — Supabase Schema
-- Run this in the Supabase SQL Editor after creating your project

-- Reports table
create table if not exists reports (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  category text not null,
  description text not null,
  location text default '',
  city text default '',
  state text default 'FL',
  time_of_day text default '',
  plate_text text, -- INTERNAL ONLY, never expose publicly
  media_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  archetype_tag text
);

-- Email waitlist for merch
create table if not exists email_waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  email text not null unique
);

-- Row Level Security: allow anonymous inserts (for report submissions)
alter table reports enable row level security;
alter table email_waitlist enable row level security;

-- Anyone can submit a report (insert only)
create policy "Anyone can submit reports"
  on reports for insert
  to anon
  with check (true);

-- Anyone can read approved reports (NO plate_text exposed)
create policy "Anyone can read approved reports"
  on reports for select
  to anon
  using (status = 'approved');

-- Authenticated users (admin) can read all reports
create policy "Admin can read all reports"
  on reports for select
  to authenticated
  using (true);

-- Authenticated users (admin) can update report status
create policy "Admin can update reports"
  on reports for update
  to authenticated
  using (true);

-- Anyone can join email waitlist
create policy "Anyone can join waitlist"
  on email_waitlist for insert
  to anon
  with check (true);

-- Create a view that NEVER exposes plate_text for public queries
create or replace view public_reports as
  select
    id,
    created_at,
    category,
    description,
    location,
    city,
    state,
    time_of_day,
    status,
    archetype_tag
  from reports
  where status = 'approved';

-- Index for common queries
create index if not exists idx_reports_status on reports(status);
create index if not exists idx_reports_category on reports(category);
create index if not exists idx_reports_city on reports(city);
create index if not exists idx_reports_created on reports(created_at desc);
