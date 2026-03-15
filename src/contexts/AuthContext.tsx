import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  auth,
  isConfigured,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
  RecaptchaVerifier,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
} from "@/lib/firebase";

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
  firebaseUser: User | null;
  loading: boolean;
  isFirebaseReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithPhone: (phone: string, recaptchaVerifier: RecaptchaVerifier) => Promise<{ confirm: (code: string) => Promise<void> }>;
  signInWithUsername: (username: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  setUsername: (username: string) => Promise<boolean>;
  checkUsernameAvailable: (username: string) => boolean;
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
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUid = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUid) {
      const users = getStoredUsers();
      if (users[storedUid]) {
        setUser(users[storedUid]);
      }
    }

    if (!isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (fbUser) {
        const users = getStoredUsers();
        const existing = users[fbUser.uid];
        const appUser: AppUser = existing || {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          username: null,
          phoneNumber: fbUser.phoneNumber,
          photoURL: fbUser.photoURL,
          provider: fbUser.providerData[0]?.providerId.includes("google") ? "google" : fbUser.phoneNumber ? "phone" : "email",
          devices: [getCurrentDeviceInfo()],
        };
        saveUser(appUser);
        localStorage.setItem(CURRENT_USER_KEY, fbUser.uid);
        setUser(appUser);
      } else {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
      setLoading(false);
    });

    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    if (!isConfigured || !auth) throw new Error("Firebase not configured. Please add Firebase credentials.");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    if (!isConfigured || !auth) {
      const mockUser: AppUser = {
        uid: `demo_${email}`,
        email,
        displayName: email.split("@")[0],
        username: null,
        phoneNumber: null,
        photoURL: null,
        provider: "email",
        devices: [getCurrentDeviceInfo()],
      };
      saveUser(mockUser);
      localStorage.setItem(CURRENT_USER_KEY, mockUser.uid);
      setUser(mockUser);
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    if (!isConfigured || !auth) {
      const mockUser: AppUser = {
        uid: `demo_${email}_${Date.now()}`,
        email,
        displayName,
        username: null,
        phoneNumber: null,
        photoURL: null,
        provider: "email",
        devices: [getCurrentDeviceInfo()],
      };
      saveUser(mockUser);
      localStorage.setItem(CURRENT_USER_KEY, mockUser.uid);
      setUser(mockUser);
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
  };

  const signInWithPhone = async (phone: string, recaptchaVerifier: RecaptchaVerifier) => {
    if (!isConfigured || !auth) {
      return {
        confirm: async (code: string) => {
          if (code === "123456") {
            const mockUser: AppUser = {
              uid: `demo_${phone}`,
              email: null,
              displayName: phone,
              username: null,
              phoneNumber: phone,
              photoURL: null,
              provider: "phone",
              devices: [getCurrentDeviceInfo()],
            };
            saveUser(mockUser);
            localStorage.setItem(CURRENT_USER_KEY, mockUser.uid);
            setUser(mockUser);
          } else {
            throw new Error("Invalid OTP. (Demo mode: use 123456)");
          }
        },
      };
    }
    const result = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
    return {
      confirm: async (code: string) => {
        await result.confirm(code);
      },
    };
  };

  const signInWithUsername = async (username: string, password: string) => {
    const users = getStoredUsers();
    const found = Object.values(users).find(
      (u) => u.username?.toLowerCase() === username.toLowerCase()
    );
    if (!found) throw new Error("Username not found. Please check and try again.");
    if (!isConfigured || !auth) {
      localStorage.setItem(CURRENT_USER_KEY, found.uid);
      setUser(found);
      return;
    }
    if (found.email) {
      await signInWithEmailAndPassword(auth, found.email, password);
    } else {
      throw new Error("Cannot login with username for phone accounts. Use phone OTP.");
    }
  };

  const forgotPassword = async (email: string) => {
    if (!isConfigured || !auth) {
      await new Promise((r) => setTimeout(r, 1000));
      return;
    }
    await sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    if (isConfigured && auth) {
      await signOut(auth);
    }
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setFirebaseUser(null);
  };

  const checkUsernameAvailable = (username: string): boolean => {
    const users = getStoredUsers();
    return !Object.values(users).some(
      (u) => u.username?.toLowerCase() === username.toLowerCase()
    );
  };

  const setUsername = async (username: string): Promise<boolean> => {
    if (!checkUsernameAvailable(username)) return false;
    if (!user) return false;
    const updated = { ...user, username };
    saveUser(updated);
    setUser(updated);
    if (isConfigured && auth && firebaseUser) {
      await updateProfile(firebaseUser, { displayName: username });
    }
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
        firebaseUser,
        loading,
        isFirebaseReady: isConfigured,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signInWithPhone,
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
