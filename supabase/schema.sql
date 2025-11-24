-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Campaigns Table
create table if not exists campaigns (
  id uuid primary key default uuid_generate_v4(),
  company_id text not null,
  name text not null,
  subject text,
  content text,
  status text default 'Draft', -- Draft, Scheduled, Sent
  type text default 'email', -- email, sms
  sent_count integer default 0,
  open_rate text default '-',
  scheduled_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Automations Table
create table if not exists automations (
  id uuid primary key default uuid_generate_v4(),
  company_id text not null,
  name text not null,
  trigger_type text, -- membership.created, etc.
  flow_data jsonb, -- React Flow JSON
  status text default 'Active', -- Active, Paused
  active_count integer default 0,
  completed_count integer default 0,
  created_at timestamp with time zone default now()
);

-- Message Logs (History) Table
create table if not exists message_logs (
  id uuid primary key default uuid_generate_v4(),
  company_id text not null,
  recipient text not null,
  type text not null, -- Email, SMS
  campaign_id uuid references campaigns(id),
  automation_id uuid references automations(id),
  status text not null, -- Delivered, Failed, Opened
  sent_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table campaigns enable row level security;
alter table automations enable row level security;
alter table message_logs enable row level security;

-- Create Policy to allow all access for Service Role (Backend)
create policy "Enable all access for service role" on campaigns
  for all
  using (true)
  with check (true);

create policy "Enable all access for service role" on automations
  for all
  using (true)
  with check (true);

create policy "Enable all access for service role" on message_logs
  for all
  using (true)
  with check (true);
