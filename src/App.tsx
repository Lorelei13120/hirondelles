import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./lib/LanguageContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import ActualitesPage from "./pages/ActualitesPage";
import EvenementsPage from "./pages/EvenementsPage";
import MaraichagePage from "./pages/MaraichagePage";
import GaleriePage from "./pages/GaleriePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/actualites" element={<ActualitesPage />} />
            <Route path="/evenements" element={<EvenementsPage />} />
            <Route path="/maraichage" element={<MaraichagePage />} />
            <Route path="/galerie" element={<GaleriePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
