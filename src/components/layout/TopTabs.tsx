import { memo } from "react";
import { Home, Wallet, Users, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "Início", icon: Home },
  { id: "expenses", label: "Despesas", icon: Wallet },
  { id: "members", label: "Membros", icon: Users },
  { id: "docs", label: "Docs", icon: FileText },
];

const TopTabs = memo(({ activeTab, onTabChange }: TopTabsProps) => {
  return (
    <nav className="shrink-0 px-4 pt-3 pb-2">
      <div className="liquid-dock mx-auto flex w-full max-w-md items-center justify-between gap-1 rounded-2xl p-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 font-display text-sm font-semibold transition-all duration-300 active:scale-95",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
              <span className="tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
});

TopTabs.displayName = "TopTabs";

export default TopTabs;
