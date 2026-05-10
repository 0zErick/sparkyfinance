import { useState, memo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getMerchantBrand, type MerchantBrand } from "@/lib/merchantLogos";
import { getBrandIcon } from "@/lib/brandIcons";

interface MerchantLogoProps {
  /** Nome livre (descrição da transação, categoria, etc) */
  name?: string;
  /** Marca já resolvida (opcional, sobrepõe `name`) */
  brand?: MerchantBrand;
  size?: number;
  className?: string;
  rounded?: string;
}

/**
 * Logo unificado de qualquer marca: mercados, farmácias, postos, restaurantes,
 * varejo, telecom, transporte, bancos, apps. Resolve via getMerchantBrand()
 * e renderiza o SVG branco do Simple Icons sobre tile da cor oficial.
 */
const MerchantLogo = memo(({ name = "", brand, size = 40, className, rounded = "rounded-xl" }: MerchantLogoProps) => {
  const resolved = brand ?? getMerchantBrand(name);
  const url = resolved.slug ? `https://cdn.simpleicons.org/${resolved.slug}/ffffff` : null;
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [resolved.slug]);

  const showImage = !!url && !errored;
  const padding = Math.max(6, Math.round(size * 0.22));

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden shrink-0 shadow-sm",
        rounded,
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: `#${resolved.hex}`,
      }}
      aria-label={resolved.name || name}
    >
      {showImage ? (
        <img
          src={url!}
          alt={resolved.name || name}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          style={{
            width: size - padding * 2,
            height: size - padding * 2,
            objectFit: "contain",
            display: "block",
          }}
        />
      ) : (() => {
        const Icon = getBrandIcon(resolved.iconName);
        if (Icon) {
          return <Icon size={Math.max(14, Math.round(size * 0.55))} className="text-white" strokeWidth={2.25} />;
        }
        return (
          <span
            className="font-bold tracking-tight text-white"
            style={{ fontSize: Math.max(11, size * 0.4), lineHeight: 1 }}
          >
            {resolved.abbr || name.slice(0, 2).toUpperCase()}
          </span>
        );
      })()}
    </div>
  );
});

MerchantLogo.displayName = "MerchantLogo";

export default MerchantLogo;
