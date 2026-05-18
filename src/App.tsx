import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import ComingSoonPage from "./pages/ComingSoonPage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import RevealObserver from "./components/aura/RevealObserver.tsx";

const queryClient = new QueryClient();
const SITE_OFFLINE = import.meta.env.PROD;
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const BuildingPage = lazy(() => import("./pages/BuildingPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const AreaPage = lazy(() => import("./pages/AreaPage.tsx"));
const ExplorePage = lazy(() => import("./pages/ExplorePage.tsx"));
const GeographyPage = lazy(() => import("./pages/GeographyPage.tsx"));
const IntentPage = lazy(() => import("./pages/IntentPage.tsx"));
const JournalArticlePage = lazy(() => import("./pages/JournalArticlePage.tsx"));
const JournalPage = lazy(() => import("./pages/JournalPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-transition-enter">
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/buy" element={<IntentPage mode="buy" />} />
          <Route path="/rent" element={<IntentPage mode="rent" />} />
          <Route path="/sell" element={<IntentPage mode="sell" />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/geography" element={<GeographyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/building/:slug" element={<BuildingPage />} />
          <Route path="/area/:slug" element={<AreaPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<JournalArticlePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {SITE_OFFLINE ? (
        <ComingSoonPage />
      ) : (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <RevealObserver />
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      )}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
