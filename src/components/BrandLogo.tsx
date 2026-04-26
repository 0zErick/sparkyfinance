import { useState, memo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { getAppBrand, getAppLogoUrl, type AppBrand } from "@/lib/brandLogos";

interface BrandLogoProps {
  /** Nome bruto do app/serviço (ex: "Netflix") OU brand já resolvida */
  appName?: string;
  brand?: AppBrand;
  size?: number;
  className?: string;
  rounded?: string;
}

/**
 * Logo de aplicativos/serviços (assinaturas) via Simple Icons CDN.
 * Fallback: avatar circular com inicial sobre cor sólida da marca.
 */
const BrandLogo = memo(({ appName = "", brand, size = 44, className, rounded = "rounded-xl" }: BrandLogoProps) => {
  const resolved = brand ?? getAppBrand(appName);
  const url = getAppLogoUrl(resolved);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [resolved.slug, resolved.hex]);

  const showImage = !!url && !errored;

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden shrink-0 shadow-sm",
        rounded,
        showImage ? "bg-white/95" : "",
        className
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: showImage ? undefined : `#${resolved.hex}`,
      }}
      aria-label={resolved.name || appName}
    >
      {showImage ? (
        <img
          src={url!}
          alt={resolved.name || appName}
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
          {resolved.abbr || appName.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
});

BrandLogo.displayName = "BrandLogo";

export default BrandLogo;
