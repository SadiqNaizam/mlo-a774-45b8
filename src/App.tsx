import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ApplicationHomepage from "./pages/ApplicationHomepage";
import LoginPage from "./pages/LoginPage";
import PasswordRecoveryPage from "./pages/PasswordRecoveryPage";
import RegistrationPage from "./pages/RegistrationPage";
import StaticContentPage from "./pages/StaticContentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<LoginPage />} />
          <Route path="/application-homepage" element={<ApplicationHomepage />} />
          <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/static-content" element={<StaticContentPage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
