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

const AuthContext = createContext<AuthContextValue | null>(null);

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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const refreshSession = useCallback(async () => {
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
