import { useState, memo } from "react";
import { cn } from "@/lib/utils";
import { getBankBrand, getBankLogoUrl, type BankBrand } from "@/lib/bankLogos";

interface BankLogoProps {
  /** Nome bruto do banco OU brand já resolvida */
  bankName?: string;
  brand?: BankBrand;
  /** Tamanho do tile em px */
  size?: number;
  /** Tailwind extra (border-radius, shadow…) */
  className?: string;
  /** Classe adicional para o tile */
  rounded?: string;
}

/**
 * Renderiza o logotipo oficial do banco (via Clearbit) sobre um tile com a cor da marca.
 * Faz fallback para a sigla caso a imagem não carregue (sem rede, banco desconhecido…).
 */
const BankLogo = memo(({ bankName = "", brand, size = 40, className, rounded = "rounded-xl" }: BankLogoProps) => {
  const resolved = brand ?? getBankBrand(bankName);
  const logoUrl = getBankLogoUrl(resolved, size * 2);
  const [errored, setErrored] = useState(false);

  const showImage = logoUrl && !errored;

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden shrink-0",
        rounded,
        resolved.bg,
        className
      )}
      style={{ width: size, height: size }}
      aria-label={resolved.name || bankName}
    >
      {showImage ? (
        <img
          src={logoUrl}
          alt={resolved.name || bankName}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
          className="h-full w-full object-contain p-1"
          style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}
        />
      ) : (
        <span className="text-xs font-bold text-white tracking-tight">
          {resolved.abbr || bankName.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
});

BankLogo.displayName = "BankLogo";

export default BankLogo;
