import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Clients from "./pages/Clients";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import BlogList from "./pages/admin/BlogList";
import BlogEditor from "./pages/admin/BlogEditor";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import HomepageAdmin from "./pages/admin/HomepageAdmin";
import AboutAdmin from "./pages/admin/AboutAdmin";
import ClientsAdmin from "./pages/admin/ClientsAdmin";
import CareersAdmin from "./pages/admin/CareersAdmin";
import ContactAdmin from "./pages/admin/ContactAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/tentang-kami" element={<About />} />
              <Route path="/layanan" element={<Services />} />
              <Route path="/layanan/:slug" element={<ServiceDetail />} />
              <Route path="/klien" element={<Clients />} />
              <Route path="/karir" element={<Career />} />
              <Route path="/kontak" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/blog" element={<BlogList />} />
              <Route path="/admin/blog/new" element={<BlogEditor />} />
              <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
              <Route path="/admin/services" element={<ServicesAdmin />} />
              <Route path="/admin/homepage" element={<HomepageAdmin />} />
              <Route path="/admin/about" element={<AboutAdmin />} />
              <Route path="/admin/clients" element={<ClientsAdmin />} />
              <Route path="/admin/careers" element={<CareersAdmin />} />
              <Route path="/admin/contact" element={<ContactAdmin />} />
              <Route path="/admin/settings" element={<SettingsAdmin />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
