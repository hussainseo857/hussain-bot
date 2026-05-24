-- ============================================================
-- Trip Trekker — Initial Schema
-- ============================================================
-- Run this file in the Supabase SQL Editor BEFORE 0002_seed.sql

create extension if not exists "pgcrypto";
-- vector extension is optional. If you don't have it enabled, comment the next line.
create extension if not exists "vector";

-- ------------------------------------------------------------
-- Generic updated_at trigger
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

-- ============================================================
-- 1. profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ============================================================
-- 2. chatbot_settings
-- ============================================================
create table if not exists public.chatbot_settings (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'Trip Trekker',
  bot_name text not null default 'Trekker Assistant',
  welcome_message text not null,
  fallback_message text not null,
  primary_color text default '#059669',
  support_email text,
  support_phone text,
  business_hours text,
  office_location text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_chatbot_settings_updated on public.chatbot_settings;
create trigger trg_chatbot_settings_updated before update on public.chatbot_settings
for each row execute function public.set_updated_at();

-- ============================================================
-- 3. allowed_topics
-- ============================================================
create table if not exists public.allowed_topics (
  id uuid primary key default gen_random_uuid(),
  topic text unique not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 4. faqs
-- ============================================================
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_faqs_updated on public.faqs;
create trigger trg_faqs_updated before update on public.faqs
for each row execute function public.set_updated_at();
create index if not exists idx_faqs_question_trgm on public.faqs using gin (to_tsvector('english', question || ' ' || answer));
create index if not exists idx_faqs_active on public.faqs(is_active);

-- ============================================================
-- 5. knowledge_base
-- ============================================================
create table if not exists public.knowledge_base (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category text,
  embedding vector(768),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_kb_updated on public.knowledge_base;
create trigger trg_kb_updated before update on public.knowledge_base
for each row execute function public.set_updated_at();
create index if not exists idx_kb_search on public.knowledge_base using gin (to_tsvector('english', title || ' ' || content));
create index if not exists idx_kb_active on public.knowledge_base(is_active);

-- Optional vector-similarity function (only useful if you populate `embedding`)
create or replace function public.match_knowledge_base(
  query_embedding vector(768),
  match_count int default 5
) returns table (
  id uuid, title text, content text, category text, similarity float
) language sql stable as $$
  select id, title, content, category,
    1 - (knowledge_base.embedding <=> query_embedding) as similarity
  from public.knowledge_base
  where embedding is not null and is_active = true
  order by knowledge_base.embedding <=> query_embedding
  limit match_count;
$$;

-- ============================================================
-- 6. destinations
-- ============================================================
create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  region text,
  description text,
  best_season text,
  difficulty_level text,
  estimated_budget text,
  highlights text,
  safety_notes text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_destinations_updated on public.destinations;
create trigger trg_destinations_updated before update on public.destinations
for each row execute function public.set_updated_at();
create index if not exists idx_destinations_search on public.destinations using gin (to_tsvector('english', name || ' ' || coalesce(region,'') || ' ' || coalesce(description,'')));
create index if not exists idx_destinations_active on public.destinations(is_active);

-- ============================================================
-- 7. trekking_routes
-- ============================================================
create table if not exists public.trekking_routes (
  id uuid primary key default gen_random_uuid(),
  route_name text not null,
  destination text,
  duration text,
  difficulty_level text,
  altitude text,
  route_summary text,
  required_gear text,
  safety_notes text,
  best_season text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_routes_updated on public.trekking_routes;
create trigger trg_routes_updated before update on public.trekking_routes
for each row execute function public.set_updated_at();
create index if not exists idx_routes_search on public.trekking_routes using gin (to_tsvector('english', route_name || ' ' || coalesce(destination,'') || ' ' || coalesce(route_summary,'')));
create index if not exists idx_routes_active on public.trekking_routes(is_active);

-- ============================================================
-- 8. travel_packages
-- ============================================================
create table if not exists public.travel_packages (
  id uuid primary key default gen_random_uuid(),
  package_name text not null,
  destination text,
  duration text,
  price_range text,
  included_services text,
  excluded_services text,
  cancellation_policy text,
  payment_policy text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_packages_updated on public.travel_packages;
create trigger trg_packages_updated before update on public.travel_packages
for each row execute function public.set_updated_at();
create index if not exists idx_packages_search on public.travel_packages using gin (to_tsvector('english', package_name || ' ' || coalesce(destination,'') || ' ' || coalesce(included_services,'')));
create index if not exists idx_packages_active on public.travel_packages(is_active);

-- ============================================================
-- 9. sample_bookings
-- ============================================================
create table if not exists public.sample_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_id text unique not null,
  customer_name text,
  package_name text,
  destination text,
  status text,
  travel_date text,
  payment_status text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists trg_bookings_updated on public.sample_bookings;
create trigger trg_bookings_updated before update on public.sample_bookings
for each row execute function public.set_updated_at();
create index if not exists idx_bookings_booking_id on public.sample_bookings(booking_id);

-- ============================================================
-- 10. conversations
-- ============================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_label text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- 11. messages
-- ============================================================
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  role text check (role in ('user','assistant','system')),
  content text,
  created_at timestamptz not null default now()
);
create index if not exists idx_messages_conv on public.messages(conversation_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.chatbot_settings enable row level security;
alter table public.allowed_topics enable row level security;
alter table public.faqs enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.destinations enable row level security;
alter table public.trekking_routes enable row level security;
alter table public.travel_packages enable row level security;
alter table public.sample_bookings enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- helper: is_admin()
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- profiles: a user can read their own profile; admin can read all
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles for select
  using (id = auth.uid() or public.is_admin());
drop policy if exists "profiles_admin_write" on public.profiles;
create policy "profiles_admin_write" on public.profiles for all
  using (public.is_admin()) with check (public.is_admin());

-- chatbot_settings: public read, admin write
drop policy if exists "settings_public_read" on public.chatbot_settings;
create policy "settings_public_read" on public.chatbot_settings for select using (true);
drop policy if exists "settings_admin_write" on public.chatbot_settings;
create policy "settings_admin_write" on public.chatbot_settings for all
  using (public.is_admin()) with check (public.is_admin());

-- allowed_topics: public read active, admin all
drop policy if exists "topics_public_read" on public.allowed_topics;
create policy "topics_public_read" on public.allowed_topics for select using (is_active = true);
drop policy if exists "topics_admin_all" on public.allowed_topics;
create policy "topics_admin_all" on public.allowed_topics for all
  using (public.is_admin()) with check (public.is_admin());

-- faqs
drop policy if exists "faqs_public_read" on public.faqs;
create policy "faqs_public_read" on public.faqs for select using (is_active = true);
drop policy if exists "faqs_admin_all" on public.faqs;
create policy "faqs_admin_all" on public.faqs for all
  using (public.is_admin()) with check (public.is_admin());

-- knowledge_base
drop policy if exists "kb_public_read" on public.knowledge_base;
create policy "kb_public_read" on public.knowledge_base for select using (is_active = true);
drop policy if exists "kb_admin_all" on public.knowledge_base;
create policy "kb_admin_all" on public.knowledge_base for all
  using (public.is_admin()) with check (public.is_admin());

-- destinations
drop policy if exists "destinations_public_read" on public.destinations;
create policy "destinations_public_read" on public.destinations for select using (is_active = true);
drop policy if exists "destinations_admin_all" on public.destinations;
create policy "destinations_admin_all" on public.destinations for all
  using (public.is_admin()) with check (public.is_admin());

-- trekking_routes
drop policy if exists "routes_public_read" on public.trekking_routes;
create policy "routes_public_read" on public.trekking_routes for select using (is_active = true);
drop policy if exists "routes_admin_all" on public.trekking_routes;
create policy "routes_admin_all" on public.trekking_routes for all
  using (public.is_admin()) with check (public.is_admin());

-- travel_packages
drop policy if exists "packages_public_read" on public.travel_packages;
create policy "packages_public_read" on public.travel_packages for select using (is_active = true);
drop policy if exists "packages_admin_all" on public.travel_packages;
create policy "packages_admin_all" on public.travel_packages for all
  using (public.is_admin()) with check (public.is_admin());

-- sample_bookings: NO public access. Only admin via dashboard;
-- chatbot accesses via service-role inside /api/chat.
drop policy if exists "bookings_admin_all" on public.sample_bookings;
create policy "bookings_admin_all" on public.sample_bookings for all
  using (public.is_admin()) with check (public.is_admin());

-- conversations & messages: locked down. The /api/chat route writes using the
-- service-role key. We do NOT expose them to the anon role.
drop policy if exists "conversations_admin_read" on public.conversations;
create policy "conversations_admin_read" on public.conversations for select
  using (public.is_admin());
drop policy if exists "messages_admin_read" on public.messages;
create policy "messages_admin_read" on public.messages for select
  using (public.is_admin());
