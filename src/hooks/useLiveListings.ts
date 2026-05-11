import { useQuery } from "@tanstack/react-query";

export type LiveListing = {
  id: string;
  listing_type: "sale" | "rent";
  property_type: "house" | "condo" | "land";
  status: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  address: string;
  unit?: string;
  city: string;
  neighborhood?: string;
  building_name?: string;
  primary_image?: string;
  media?: { url: string; order: number; is_primary: boolean }[];
};

export type ListingFilters = {
  type?: "sale" | "rent";
  neighborhood?: string;
  min_beds?: number;
  max_price?: number;
  limit?: number;
};

const buildUrl = (path: string, params: Record<string, string | number | undefined>) => {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  return url.toString();
};

export const useLiveListings = (filters: ListingFilters = {}) => {
  return useQuery({
    queryKey: ["live-listings", filters],
    queryFn: async (): Promise<LiveListing[]> => {
      const url = buildUrl("/api/listings", {
        type: filters.type,
        neighborhood: filters.neighborhood,
        min_beds: filters.min_beds,
        max_price: filters.max_price,
        limit: filters.limit ?? 12,
      });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch listings");
      return res.json();
    },
    staleTime: 60_000,
    retry: 1,
  });
};

export const useListingSearch = (query: string, filters: ListingFilters = {}) => {
  return useQuery({
    queryKey: ["listing-search", query, filters],
    queryFn: async (): Promise<LiveListing[]> => {
      const url = buildUrl("/api/search", {
        q: query,
        type: filters.type,
        max_price: filters.max_price,
        min_beds: filters.min_beds,
        limit: filters.limit ?? 20,
      });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
};
