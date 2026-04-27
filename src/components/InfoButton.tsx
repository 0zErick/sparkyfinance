import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface InfoButtonProps {
  size?: number;
  className?: string;
  /** Estado controlado (opcional). Se omitido, gerencia internamente. */
  expanded?: boolean;
  onToggle?: (next: boolean) => void;
}

/**
 * Botão "info" universal — somente o trigger.
 * O painel expansível com a explicação deve ser renderizado pelo pai
 * usando <InfoPanel expanded={...}> logo abaixo do header do card.
 */
export const InfoButton = ({
  size = 14,
  className,
  expanded,
  onToggle,
}: InfoButtonProps) => {
  const [internal, setInternal] = useState(false);
  const isOpen = expanded ?? internal;

  const handle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isOpen;
    if (onToggle) onToggle(next);
    else setInternal(next);
  };

  return (
    <button
      type="button"
      onClick={handle}
      aria-label="Mostrar informações"
      aria-expanded={isOpen}
      className={cn(
        "inline-flex items-center justify-center rounded-full p-1 transition-all duration-200",
        isOpen
          ? "text-primary bg-primary/10"
          : "text-muted-foreground/80 hover:text-primary hover:bg-primary/10",
        "active:scale-90",
        className
      )}
    >
      <Info size={size} strokeWidth={2.2} />
    </button>
  );
};

interface InfoPanelProps {
  expanded: boolean;
  children: React.ReactNode;
  /** Altura máxima quando expandido (px). Default 200. */
  maxHeight?: number;
  className?: string;
}

/**
 * Painel expansível que aparece sob o trigger.
 * Usa transição CSS de max-height/opacity (mesmo padrão do card "Reserva de Contas").
 */
export const InfoPanel = ({
  expanded,
  children,
  maxHeight = 200,
  className,
}: InfoPanelProps) => (
  <div
    className={cn("overflow-hidden transition-all duration-300 ease-in-out", className)}
    style={{
      maxHeight: expanded ? `${maxHeight}px` : "0px",
      opacity: expanded ? 1 : 0,
      marginTop: expanded ? "0.25rem" : "0",
      marginBottom: expanded ? "0.5rem" : "0",
    }}
    aria-hidden={!expanded}
  >
    <p className="text-[11px] text-muted-foreground leading-relaxed px-0.5">
      {children}
    </p>
  </div>
);

export default InfoButton;
