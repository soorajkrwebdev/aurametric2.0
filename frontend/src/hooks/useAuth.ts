import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, type SupabaseProfileInsert } from "@/lib/supabase";

type AuthResult = {
  ok: boolean;
  error?: string;
  user?: User | null;
  session?: Session | null;
};

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  college: string;
  course: string;
  semester?: number | null;
  section?: string | null;
};

type LoginInput = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  register: (input: RegisterInput) => Promise<AuthResult>;
  login: (input: LoginInput) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const DEMO_EMAIL = "ananya.krishnan@campus.edu";
const DEMO_PASSWORD = "demo-only";
const DEMO_USER_ID = "demo-user";
const DEMO_NAME = "Ananya Krishnan";

const AuthContext = createContext<AuthContextValue | null>(null);

function isDemoMode(): boolean {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "";

  return (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes("placeholder") ||
    supabaseKey.includes("placeholder")
  );
}

function buildDemoUser(): User {
  return {
    id: DEMO_USER_ID,
    email: DEMO_EMAIL,
    user_metadata: {
      full_name: DEMO_NAME,
      college: "North Campus",
      course: "B.Sc. Computer Science",
      semester: 5,
      section: "A",
    },
    app_metadata: { provider: "demo" },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString(),
    phone: null,
    email_confirmed_at: new Date().toISOString(),
    identities: [],
    factors: [],
  } as User;
}

function buildDemoSession(): Session {
  const user = buildDemoUser();

  return {
    access_token: "demo-access-token",
    refresh_token: "demo-refresh-token",
    expires_in: 3600,
    expires_at: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
    token_type: "bearer",
    user,
  } as Session;
}

function buildProfile(input: RegisterInput, userId: string, email: string | null): SupabaseProfileInsert {
  return {
    id: userId,
    name: input.name.trim() || null,
    email: email || input.email,
    college: input.college.trim() || null,
    course: input.course.trim() || null,
    semester: input.semester ?? null,
    section: input.section?.trim() || null,
    profile_image: null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const demoEnabled = isDemoMode();
  const [session, setSession] = useState<Session | null>(demoEnabled ? buildDemoSession() : null);
  const [user, setUser] = useState<User | null>(demoEnabled ? buildDemoUser() : null);
  const [loading, setLoading] = useState(!demoEnabled);

  useEffect(() => {
    if (demoEnabled) {
      setSession(buildDemoSession());
      setUser(buildDemoUser());
      setLoading(false);
      return;
    }

    let isMounted = true;

    const syncAuthState = async () => {
      const {
        data: { session: activeSession },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Unable to fetch Supabase session:", error.message);
      }

      setSession(activeSession);
      setUser(activeSession?.user ?? null);
      setLoading(false);
    };

    syncAuthState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!isMounted) {
        return;
      }

      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [demoEnabled]);

  const refreshSession = useCallback(async () => {
    if (isDemoMode()) {
      const demoSession = buildDemoSession();
      setSession(demoSession);
      setUser(demoSession.user);
      return;
    }

    const {
      data: { session: nextSession },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    setSession(nextSession);
    setUser(nextSession?.user ?? null);
  }, []);

  const register = useCallback(async (input: RegisterInput): Promise<AuthResult> => {
    if (isDemoMode()) {
      const demoSession = buildDemoSession();
      setSession(demoSession);
      setUser(demoSession.user);
      return {
        ok: true,
        user: demoSession.user,
        session: demoSession,
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        data: {
          full_name: input.name,
          college: input.college,
          course: input.course,
          semester: input.semester ?? null,
          section: input.section ?? null,
        },
      },
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    const signedUser = data.user;

    if (signedUser) {
      const profilePayload = buildProfile(input, signedUser.id, signedUser.email ?? input.email);

      const { error: profileError } = await supabase
        .from("profiles")
        .upsert(profilePayload, { onConflict: "id" });

      if (profileError) {
        await supabase.auth.signOut();
        return {
          ok: false,
          error: "Account created, but your profile could not be saved. Please try again.",
        };
      }
    }

    return {
      ok: true,
      user: data.user,
      session: data.session,
    };
  }, []);

  const login = useCallback(async (input: LoginInput): Promise<AuthResult> => {
    if (isDemoMode()) {
      const emailMatches = input.email.trim().toLowerCase() === DEMO_EMAIL.toLowerCase();
      const passwordMatches = input.password === DEMO_PASSWORD;

      if (!emailMatches || !passwordMatches) {
        return {
          ok: false,
          error: "Use the demo account: ananya.krishnan@campus.edu / demo-only",
        };
      }

      const demoSession = buildDemoSession();
      setSession(demoSession);
      setUser(demoSession.user);

      return {
        ok: true,
        user: demoSession.user,
        session: demoSession,
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error) {
      return { ok: false, error: error.message };
    }

    return {
      ok: true,
      user: data.user,
      session: data.session,
    };
  }, []);

  const logout = useCallback(async () => {
    if (isDemoMode()) {
      setSession(null);
      setUser(null);
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      register,
      login,
      logout,
      refreshSession,
    }),
    [loading, login, logout, refreshSession, register, session, user],
  );

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
