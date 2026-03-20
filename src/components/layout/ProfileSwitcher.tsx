import { useState } from "react";
import { ChevronDown, Check, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const profiles = [
  { id: "erick", name: "Erick", initials: "E", color: "from-primary to-primary/60" },
  { id: "ana", name: "Ana", initials: "A", color: "from-pink-500 to-pink-500/60" },
  { id: "casa", name: "Casa", initials: "C", color: "from-amber-500 to-amber-500/60" },
];

const ProfileSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("erick");

  const current = profiles.find((p) => p.id === active)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 active:scale-95 transition-transform"
      >
        <div className={cn("h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white", current.color)}>
          {current.initials}
        </div>
        <ChevronDown size={14} className={cn("text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-border bg-card p-1.5 shadow-xl shadow-black/30 fade-in-up">
            {profiles.map((p) => (
              <button
                key={p.id}
                onClick={() => { setActive(p.id); setOpen(false); }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors active:scale-[0.97]",
                  active === p.id ? "bg-primary/10" : "hover:bg-muted/50"
                )}
              >
                <div className={cn("h-7 w-7 rounded-full bg-gradient-to-br flex items-center justify-center text-[10px] font-bold text-white", p.color)}>
                  {p.initials}
                </div>
                <span className="text-sm font-medium flex-1">{p.name}</span>
                {active === p.id && <Check size={14} className="text-primary" />}
              </button>
            ))}
            <div className="my-1 h-px bg-border" />
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-muted-foreground hover:bg-muted/50 transition-colors active:scale-[0.97]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-muted-foreground/40">
                <UserPlus size={12} />
              </div>
              <span className="text-sm">Adicionar perfil</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileSwitcher;
