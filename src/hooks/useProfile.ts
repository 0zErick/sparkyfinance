import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  invite_code: string;
  group_code: string | null;
  points: number;
  role: string;
  created_at: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isDemo = localStorage.getItem("sparky-demo-mode") === "true";

  useEffect(() => {
    if (isDemo) {
      setProfile({
        id: "demo",
        user_id: "demo",
        name: "Usuário Demo",
        email: "demo@sparky.app",
        phone: null,
        avatar_url: null,
        invite_code: "DEMO2026",
        group_code: "DEMO2026",
        points: 60,
        role: "admin",
        created_at: new Date().toISOString(),
      });
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (error) {
          console.error("Profile fetch error:", error.message);
        }
        if (data) setProfile(data as Profile);
      } catch (err) {
        console.error("Profile fetch exception:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchProfile();
    });

    return () => subscription.unsubscribe();
  }, [isDemo]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (isDemo || !profile) return;
    const { data } = await supabase
      .from("profiles")
      .update(updates)
      .eq("user_id", profile.user_id)
      .select()
      .single();
    if (data) setProfile(data as Profile);
  };

  return { profile, loading, updateProfile, isDemo };
};
