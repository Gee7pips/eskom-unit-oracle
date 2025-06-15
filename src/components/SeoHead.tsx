
import React from "react";

/**
 * Universal SEO meta component for per-page customization.
 * Place <SeoHead ... /> at the root of each page.
 */
interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  canonicalUrl?: string;
}
const DEFAULT_IMAGE = "https://lovable.dev/opengraph-image-p98pqg.png";
const DEFAULT_KEYWORDS = "Eskom, electricity calculator, tariffs, prepaid, South Africa, kWh, energy, power, utility, 2025, EskomCalc Pro";
export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  canonicalUrl,
}) => (
  <>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:type" content="website" />
    {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </>
);

