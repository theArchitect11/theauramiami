-- Phase 1: Live Listings Architecture

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Create the Live Listings table
create table if not exists public.live_listings (
  id uuid default uuid_generate_v4() primary key,
  mls_id text unique not null,
  listing_type text not null, -- 'sale' | 'rent'
  property_type text not null, -- 'condo' | 'house' | 'land'
  status text not null, -- 'Active' | 'Pending' | 'Sold'
  
  -- Core Specs
  price numeric not null,
  bedrooms integer,
  bathrooms numeric(3,1),
  sqft integer,
  lot_size_acres numeric(10,4),
  year_built integer,
  
  -- Location
  address text not null,
  unit text,
  city text not null,
  neighborhood text,
  zip_code text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  
  -- Branding & Description
  building_name text,
  remarks text,
  listing_url text,
  
  -- Metadata
  last_mls_update timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 2. Create the Listing Media table for photos
create table if not exists public.listing_media (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.live_listings(id) on delete cascade,
  url text not null,
  "order" integer default 0,
  is_primary boolean default false,
  created_at timestamp with time zone default now()
);

-- 3. Enable RLS (Row Level Security)
alter table public.live_listings enable row level security;
alter table public.listing_media enable row level security;

-- 4. Setup Public Read Policies
create policy "Allow public read access for live_listings"
  on public.live_listings for select
  using (true);

create policy "Allow public read access for listing_media"
  on public.listing_media for select
  using (true);

-- 5. Helper function for searching (optional but recommended for Phase 3)
create or replace function public.search_listings(
  query_text text,
  max_price numeric default null,
  min_beds integer default null,
  p_type text default null
)
returns setof public.live_listings
language sql
security definer
as $$
  select *
  from public.live_listings
  where 
    (query_text is null or 
     address ilike '%' || query_text || '%' or 
     neighborhood ilike '%' || query_text || '%' or 
     building_name ilike '%' || query_text || '%')
    and (max_price is null or price <= max_price)
    and (min_beds is null or bedrooms >= min_beds)
    and (p_type is null or property_type = p_type)
  order by created_at desc;
$$;
