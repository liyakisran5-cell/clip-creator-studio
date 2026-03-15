import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  username: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  provider: "google" | "email" | "phone" | "username";
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
  devices?: DeviceInfo[];
}

export interface DeviceInfo {
  id: string;
  name: string;
  browser: string;
  os: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface AuthContextType {
  user: AppUser | null;
  supabaseUser: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  isSupabaseReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithUsername: (username: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  setUsername: (username: string) => Promise<boolean>;
  checkUsernameAvailable: (username: string) => Promise<boolean>;
  updateSocialLinks: (links: AppUser["socialLinks"]) => void;
  logoutDevice: (deviceId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "tt_users";
const CURRENT_USER_KEY = "tt_current_user";

function getStoredUsers(): Record<string, AppUser> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUser(user: AppUser) {
  const users = getStoredUsers();
  users[user.uid] = user;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentDeviceInfo(): DeviceInfo {
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  const browser = ua.includes("Chrome") ? "Chrome" : ua.includes("Firefox") ? "Firefox" : ua.includes("Safari") ? "Safari" : "Browser";
  const os = ua.includes("Windows") ? "Windows" : ua.includes("Mac") ? "macOS" : ua.includes("Android") ? "Android" : ua.includes("iPhone") || ua.includes("iPad") ? "iOS" : "Unknown OS";
  return {
    id: `device_${Date.now()}`,
    name: isMobile ? "Mobile Device" : "Desktop",
    browser,
    os,
    location: "Pakistan",
    lastActive: new Date().toISOString(),
    isCurrent: true,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user first
    const storedUid = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUid) {
      const users = getStoredUsers();
      if (users[storedUid]) {
        setUser(users[storedUid]);
      }
    }

    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        handleUserLogin(session.user);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setSupabaseUser(session?.user ?? null);
      if (session?.user) {
        handleUserLogin(session.user);
      } else {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUserLogin = (sbUser: SupabaseUser) => {
    const users = getStoredUsers();
    const existing = users[sbUser.id];
    const provider = sbUser.app_metadata?.provider;
    const appUser: AppUser = existing || {
      uid: sbUser.id,
      email: sbUser.email || null,
      displayName: sbUser.user_metadata?.full_name || sbUser.user_metadata?.name || sbUser.email?.split("@")[0] || null,
      username: null,
      phoneNumber: sbUser.phone || null,
      photoURL: sbUser.user_metadata?.avatar_url || sbUser.user_metadata?.picture || null,
      provider: provider === "google" ? "google" : sbUser.phone ? "phone" : "email",
      devices: [getCurrentDeviceInfo()],
    };
    saveUser(appUser);
    localStorage.setItem(CURRENT_USER_KEY, sbUser.id);
    setUser(appUser);
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase not configured");
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/username-setup`,
      },
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase not configured");
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase not configured");
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
        },
      },
    });
    if (error) throw error;
  };

  const signInWithUsername = async (username: string, password: string) => {
    const users = getStoredUsers();
    const found = Object.values(users).find(
      (u) => u.username?.toLowerCase() === username.toLowerCase()
    );
    if (!found) throw new Error("Username not found. Please check and try again.");
    
    if (found.email) {
      await signInWithEmail(found.email, password);
    } else {
      throw new Error("Cannot login with username for accounts without email.");
    }
  };

  const forgotPassword = async (email: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase not configured");
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setSupabaseUser(null);
    setSession(null);
  };

  const checkUsernameAvailable = async (username: string): Promise<boolean> => {
    const users = getStoredUsers();
    return !Object.values(users).some(
      (u) => u.username?.toLowerCase() === username.toLowerCase()
    );
  };

  const setUsername = async (username: string): Promise<boolean> => {
    const isAvailable = await checkUsernameAvailable(username);
    if (!isAvailable) return false;
    if (!user) return false;
    const updated = { ...user, username };
    saveUser(updated);
    setUser(updated);
    return true;
  };

  const updateSocialLinks = (links: AppUser["socialLinks"]) => {
    if (!user) return;
    const updated = { ...user, socialLinks: links };
    saveUser(updated);
    setUser(updated);
  };

  const logoutDevice = (deviceId: string) => {
    if (!user) return;
    const devices = (user.devices || []).filter((d) => d.id !== deviceId);
    const updated = { ...user, devices };
    saveUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        session,
        loading,
        isSupabaseReady: isSupabaseConfigured,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInWithUsername,
        forgotPassword,
        logout,
        setUsername,
        checkUsernameAvailable,
        updateSocialLinks,
        logoutDevice,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
