import { useState, useCallback } from "react";
import { Sun, Moon, RefreshCcw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ProfileSwitcher from "@/components/layout/ProfileSwitcher";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "sonner";

const CACHE_KEYS_TO_CLEAR = [
  "sparky-daily-snapshot",
  "sparky-open-finance-cache",
  "sparky-sync-data",
  "sparky-sync-status",
];

interface HeaderProps {
  hidden?: boolean;
}

const Header = ({ hidden = false }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);

  const handleSync = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      CACHE_KEYS_TO_CLEAR.forEach((k) => localStorage.removeItem(k));
      window.dispatchEvent(new Event("sparky-profile-refresh"));
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["financial-data"] }),
        queryClient.invalidateQueries({ queryKey: ["profile"] }),
        queryClient.invalidateQueries({ queryKey: ["group-members"] }),
        queryClient.refetchQueries({ type: "active" }),
      ]);
      window.dispatchEvent(new Event("sparky-data-cleared"));
      window.dispatchEvent(new Event("sparky-points-updated"));
      toast.success("Dados sincronizados.", { duration: 2000 });
    } catch {
      toast.error("Erro ao sincronizar", { duration: 2000 });
    } finally {
      setSyncing(false);
    }
  }, [syncing, queryClient]);

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-background/70 backdrop-blur-2xl transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <ProfileSwitcher trigger="hamburger" />
      <div className="flex items-center gap-1">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="rounded-2xl p-2.5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-muted/50 active:scale-95 disabled:opacity-50"
          title="Sincronizar dados"
        >
          <RefreshCcw size={16} className={syncing ? "animate-spin" : ""} />
        </button>
        <button
          onClick={toggleTheme}
          className="rounded-2xl p-2.5 text-muted-foreground transition-all duration-300 hover:text-foreground hover:bg-muted/50 active:scale-95"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
