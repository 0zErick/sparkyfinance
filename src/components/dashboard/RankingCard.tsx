import { useState, useEffect } from "react";
import { Crown, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const RankingCard = () => {
  const [leader, setLeader] = useState<{ name: string; points: number } | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: profiles } = await supabase
        .from("profiles")
        .select("name, points, user_id")
        .order("points", { ascending: false })
        .limit(1);
      if (profiles?.[0]) {
        setLeader({ name: profiles[0].name, points: profiles[0].points });
      }
    };
    load();
  }, []);

  if (!leader) return null;

  return (
    <div className="card-zelo fade-in-up stagger-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15">
            <Crown size={18} className="text-warning" />
          </div>
          <div>
            <p className="text-sm font-semibold">Ranking</p>
            <p className="text-xs text-muted-foreground">{leader.name} • Líder</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1">
          <TrendingUp size={12} className="text-warning" />
          <span className="text-xs font-bold text-warning tabular-nums">{leader.points} pts</span>
        </div>
      </div>
    </div>
  );
};

export default RankingCard;
