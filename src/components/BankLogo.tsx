import { useState, memo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getBankBrand, getBankLogoUrl, type BankBrand } from "@/lib/bankLogos";

interface BankLogoProps {
  bankName?: string;
  brand?: BankBrand;
  size?: number;
  className?: string;
  rounded?: string;
}

/**
 * Logo oficial do banco via Simple Icons CDN (SVG vetorial, fundo transparente).
 * Se o slug não existir ou a imagem falhar, exibe um avatar circular com a inicial
 * sobre a cor sólida da marca — sem APIs externas, 100% determinístico.
 */
const BankLogo = memo(({ bankName = "", brand, size = 40, className, rounded = "rounded-xl" }: BankLogoProps) => {
  const resolved = brand ?? getBankBrand(bankName);
  const url = getBankLogoUrl(resolved);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [resolved.slug, resolved.hex]);

  const showImage = !!url && !errored;

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden shrink-0",
        rounded,
        // Sem URL OU imagem errored: fundo sólido da marca. Com imagem: fundo claro neutro p/ contraste.
        showImage ? "bg-white/95" : "",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: showImage ? undefined : `#${resolved.hex}`,
      }}
      aria-label={resolved.name || bankName}
    >
      {showImage ? (
        <img
          src={url!}
          alt={resolved.name || bankName}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          className="h-full w-full p-1.5"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <span
          className="font-bold tracking-tight text-white"
          style={{ fontSize: Math.max(10, size * 0.34) }}
        >
          {resolved.abbr || bankName.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
});

BankLogo.displayName = "BankLogo";

export default BankLogo;
