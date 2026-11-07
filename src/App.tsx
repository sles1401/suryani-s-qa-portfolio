import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const Projects = lazy(() => import("./pages/Projects"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const HowITest = lazy(() => import("./pages/HowITest"));
const BugHunter = lazy(() => import("./pages/BugHunter"));
const ApiConsole = lazy(() => import("./pages/ApiConsole"));

const queryClient = new QueryClient();

const AnalyticsTracker = () => {
  const location = useLocation();
  return <Analytics route={location.pathname} />;
};

const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-[60vh] items-center justify-center"
  >
    <span className="sr-only">Loading page…</span>
    <span
      aria-hidden="true"
      className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <CustomCursor />
          <AnalyticsTracker />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Navigate to="/resume" replace />} />
              <Route path="/experience" element={<Navigate to="/resume" replace />} />
              <Route path="/skills" element={<Navigate to="/resume" replace />} />
              <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="/how-i-test" element={<HowITest />} />
              <Route path="/bug-hunter" element={<BugHunter />} />
              <Route path="/api-console" element={<ApiConsole />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
