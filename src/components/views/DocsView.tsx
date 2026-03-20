import { useState } from "react";
import { Search, FolderOpen, Plus, Upload, Check, X, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const ClipboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="4" width="14" height="17" rx="2" fill="white" fillOpacity="0.9"/>
    <rect x="8" y="1" width="8" height="4" rx="1" fill="#9CA3AF"/>
    <path d="M9 10h6M9 14h4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ContaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2" fill="white" fillOpacity="0.9"/>
    <path d="M8 8h8M8 12h6M8 16h4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 14l-2 4h4l-2-4z" fill="#9CA3AF"/>
  </svg>
);

const ContratoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="2" width="16" height="20" rx="2" fill="white" fillOpacity="0.9"/>
    <path d="M8 7h8M8 11h6" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 15l3 5 1-3" stroke="#B87333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 15l3 5 1-3" stroke="#B87333" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#93C5FD" fillOpacity="0.3"/>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="#60A5FA" strokeWidth="1.2"/>
    <circle cx="9" cy="10" r="3" fill="#1E3A5F"/>
    <rect x="14" y="8" width="5" height="1.5" rx="0.5" fill="#1E3A5F"/>
    <rect x="14" y="11" width="4" height="1.5" rx="0.5" fill="#1E3A5F"/>
    <rect x="6" y="16" width="12" height="1.5" rx="0.5" fill="#1E3A5F"/>
  </svg>
);

const ManualIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M4 4c0-1 1-2 2-2h5l1 1v18l-1 1H6c-1 0-2-1-2-2V4z" fill="#1E3A5F"/>
    <path d="M12 3h6c1 0 2 1 2 2v16c0 1-1 2-2 2h-6V3z" fill="#1E40AF"/>
    <rect x="5" y="6" width="6" height="1" rx="0.5" fill="white" fillOpacity="0.5"/>
    <rect x="5" y="9" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.3"/>
    <rect x="13" y="6" width="6" height="1" rx="0.5" fill="white" fillOpacity="0.5"/>
    <rect x="13" y="9" width="5" height="1" rx="0.5" fill="white" fillOpacity="0.3"/>
  </svg>
);

const PastaIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M2 8c0-1 1-2 2-2h5l2 2h9c1 0 2 1 2 2v10c0 1-1 2-2 2H4c-1 0-2-1-2-2V8z" fill="#B8860B"/>
    <path d="M2 6h7l2 2" stroke="#E8A317" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const filters = [
  { label: "Todos", icon: ClipboardIcon },
  { label: "Conta", icon: ContaIcon },
  { label: "Contrato", icon: ContratoIcon },
  { label: "Documento", icon: DocumentoIcon },
  { label: "Manual", icon: ManualIcon },
  { label: "Outros", icon: PastaIcon },
];

const categories = ["Conta", "Contrato", "Documento", "Manual", "Outros"];

const DocsView = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Documento");

  return (
    <>
      <div className="px-4 pb-24 space-y-4">
        <div className="pt-3">
          <h1 className="text-xl font-bold">Documentos</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-muted/50 pl-9 pr-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filters.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={cn(
                  "flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all active:scale-95",
                  activeFilter === f.label
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground border border-border"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Icon />
                  {f.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 fade-in-up">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
            <FolderOpen size={32} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">Nenhum documento</p>
          <p className="text-[11px] text-muted-foreground mb-4">Seus documentos aparecerão aqui</p>
          <button
            onClick={() => setUploadOpen(true)}
            className="rounded-xl border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground active:scale-95 transition-all flex items-center gap-2"
          >
            <Plus size={14} />
            Adicionar Documento
          </button>
        </div>
      </div>

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setUploadOpen(false)} />
          <div className="relative w-full max-w-lg animate-slide-up rounded-t-3xl bg-card border-t border-border p-5 pb-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Novo Documento</h2>
              <button onClick={() => setUploadOpen(false)} className="rounded-full p-1.5 text-muted-foreground hover:text-foreground active:scale-95 transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Upload Zone */}
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-10 mb-5 cursor-pointer hover:border-primary/50 transition-colors active:scale-[0.99]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 mb-3">
                <Upload size={20} className="text-primary" />
              </div>
              <p className="text-sm font-medium">Clique para enviar</p>
              <p className="text-[10px] text-muted-foreground mt-1">PDF ou Imagem</p>
            </div>

            {/* Info */}
            <p className="text-label mb-3">INFORMAÇÕES BÁSICAS</p>
            <div className="space-y-3 mb-5">
              <input
                type="text"
                placeholder="Nome do documento"
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              <div>
                <label className="text-[11px] text-muted-foreground mb-1.5 block">Categoria</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-medium transition-all active:scale-95",
                        selectedCategory === cat
                          ? "bg-primary/15 text-primary border border-primary"
                          : "bg-muted/50 text-muted-foreground border border-border"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tags */}
            <p className="text-label mb-3">TAGS</p>
            <input
              type="text"
              placeholder="Adicionar tags separadas por vírgula"
              className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-5"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setUploadOpen(false)}
                className="flex-1 rounded-xl border border-border py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground active:scale-[0.98] transition-all"
              >
                Cancelar
              </button>
              <button className="flex-1 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Check size={16} />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DocsView;
