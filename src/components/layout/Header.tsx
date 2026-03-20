import { Sun, Ghost } from "lucide-react";

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
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-bold text-primary-foreground">
          E
        </div>
      </div>
    </header>
  );
};

export default Header;
