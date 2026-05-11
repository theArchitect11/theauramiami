import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type LiveListing = {
  id: string;
  mls_id: string;
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
  images: string[];
};

type ListingMedia = {
  url: string;
  is_primary?: boolean | null;
  order?: number | null;
};

type LiveListingRow = Omit<LiveListing, "images"> & {
  listing_media?: ListingMedia[] | null;
};

export const useLiveListings = (options: {
  propertyType?: "house" | "condo";
  maxPrice?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: ["live-listings", options],
    queryFn: async () => {
      if (!supabase) return [];

      let query = supabase
        .from("live_listings")
        .select(`
          *,
          listing_media (url, is_primary, order)
        `)
        .order("created_at", { ascending: false });

      if (options.propertyType) {
        query = query.eq("property_type", options.propertyType);
      }

      if (options.maxPrice) {
        query = query.lte("price", options.maxPrice);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return ((data ?? []) as LiveListingRow[]).map((item) => {
        const { listing_media: listingMedia, ...listing } = item;
        return {
          ...listing,
          images: [...(listingMedia ?? [])]
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((media) => media.url),
        };
      });
    },
    enabled: !!supabase,
  });
};
