import { useState, useEffect, useCallback, memo } from "react";
import { Home, CheckSquare, Wallet, FileText, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Hoje", icon: Home },
  { id: "tasks", label: "Ranking", icon: CheckSquare },
  { id: "chat", label: "Sparky", icon: MessageCircle },
  { id: "expenses", label: "Despesas", icon: Wallet },
  { id: "docs", label: "Docs", icon: FileText },
];

const TabBar = memo(({ activeTab, onTabChange }: TabBarProps) => {
  const [hidden, setHidden] = useState(false);
  const queryClient = useQueryClient();

  const handlePointerEnter = useCallback((tabId: string) => {
    if (tabId === "expenses" && activeTab !== "expenses") {
      queryClient.prefetchQuery({ queryKey: ["financial-data"] });
    }
  }, [activeTab, queryClient]);

  useEffect(() => {
    const showHandler = () => setHidden(false);
    const hideHandler = () => setHidden(true);

    window.addEventListener("sparky-dock-show", showHandler);
    window.addEventListener("sparky-dock-hide", hideHandler);

    return () => {
      window.removeEventListener("sparky-dock-show", showHandler);
      window.removeEventListener("sparky-dock-hide", hideHandler);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-[60] transition-transform duration-300 will-change-transform",
        hidden && "translate-y-full"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-lg items-center justify-center px-4 pb-3 pt-2 lg:max-w-4xl xl:max-w-6xl">
          <div className="liquid-dock flex w-full items-center justify-around rounded-3xl px-2 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  onPointerEnter={() => handlePointerEnter(tab.id)}
                  className={cn(
                    "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-2 transition-transform duration-300 will-change-transform",
                    isActive
                      ? "bg-primary/15 text-primary shadow-sm shadow-primary/10"
                      : "text-muted-foreground hover:text-foreground active:scale-95"
                  )}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className={cn("text-[9px] font-display tabular-nums", isActive ? "font-bold" : "font-medium")}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
});

TabBar.displayName = "TabBar";

export default TabBar;
