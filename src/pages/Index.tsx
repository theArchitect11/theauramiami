import Navbar from "@/components/aura/Navbar";
import Hero from "@/components/aura/Hero";
import HomeMagazine from "@/components/aura/HomeMagazine";
import Footer from "@/components/aura/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HomeMagazine />
      <Footer />
    </main>
  );
};

export default Index;
