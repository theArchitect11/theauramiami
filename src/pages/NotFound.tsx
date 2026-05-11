import { Link } from "react-router-dom";
import Navbar from "@/components/aura/Navbar";
import Footer from "@/components/aura/Footer";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <Navbar />
      <section className="min-h-[72vh] flex items-center justify-center px-6 pt-28">
        <div className="text-center max-w-xl">
          <p className="eyebrow mb-5">Not Found</p>
          <h1 className="serif text-6xl md:text-8xl gold-text mb-6">404</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            This page is not part of the current private residence guide.
          </p>
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center border border-primary/50 px-7 py-4 text-center text-xs uppercase tracking-[0.18em] text-primary transition-all duration-500 hover:bg-primary hover:text-primary-foreground sm:px-8 sm:tracking-[0.25em]"
          >
            Return Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NotFound;
