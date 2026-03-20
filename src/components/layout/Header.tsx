import { Sun, Ghost } from "lucide-react";
import ProfileSwitcher from "@/components/layout/ProfileSwitcher";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Ghost size={18} className="text-primary" />
        </div>
        <span className="text-lg font-bold tracking-tight">ZELO</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground active:scale-95">
          <Sun size={18} />
        </button>
        <ProfileSwitcher />
      </div>
    </header>
  );
};

export default Header;
