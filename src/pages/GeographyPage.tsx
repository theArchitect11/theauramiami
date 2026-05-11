import { useEffect } from "react";
import Navbar from "@/components/aura/Navbar";
import GeographyAtlas from "@/components/aura/GeographyAtlas";
import Footer from "@/components/aura/Footer";

const GeographyPage = () => {
  useEffect(() => {
    document.title = "Miami Geography Atlas | The Aura Miami";

    const description =
      "A north-to-south guide to Miami luxury geography, from Golden Beach and Sunny Isles to Coral Gables, Key Biscayne, and the southern estate corridors.";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://theauramiami.com/geography";
  }, []);

  return (
    <main className="editorial-page editorial-atlas-page min-h-screen bg-background animate-fade-in">
      <Navbar />
      <div className="pt-20">
        <GeographyAtlas />
      </div>
      <Footer />
    </main>
  );
};

export default GeographyPage;
