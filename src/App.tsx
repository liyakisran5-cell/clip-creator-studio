import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import DiscoverPage from "./pages/DiscoverPage";
import UploadPage from "./pages/UploadPage";
import InboxPage from "./pages/InboxPage";
import DMPage from "./pages/DMPage";
import FollowListPage from "./pages/FollowListPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsUserPage from "./pages/SettingsUserPage";
import SoundPage from "@/components/tiktok/SoundPage";
import SoundsLibraryPage from "./pages/SoundsLibraryPage";
import AuthPage from "./pages/AuthPage";
import UsernameSetup from "./pages/UsernameSetup";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UsersPage from "./pages/admin/UsersPage";
import VideosPage from "./pages/admin/VideosPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="dark min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-tiktok-pink border-t-transparent animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/username-setup" element={<UsernameSetup />} />
      <Route path="/" element={<Feed />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/discover" element={<DiscoverPage />} />
      <Route path="/sounds" element={<SoundsLibraryPage />} />
      <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
      <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
      <Route path="/dm/:username" element={<ProtectedRoute><DMPage /></ProtectedRoute>} />
      <Route path="/follow/:username" element={<FollowListPage />} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsUserPage /></ProtectedRoute>} />
      <Route path="/sound/:songName" element={<SoundPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="videos" element={<VideosPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
