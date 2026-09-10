import { Helmet } from "react-helmet-async";

const SITE_NAME = "یدک‌کان";
const SITE_URL = "https://api.yadakkan.ir";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const TWITTER_HANDLE = "";

function warnIfBad(label, text, min, max) {
  if (process.env.NODE_ENV !== "production" && text) {
    const len = text.length;
    if (len < min) {
      console.warn(`[SEO] ${label} ${len} کاراکتر - حداقل ${min} کاراکتر پیشنهاد میشه`);
    }
    if (len > max) {
      console.warn(`[SEO] ${label} ${len} کاراکتر - گوگل بعد از ${max} کاراکتر قطعش می‌کنه`);
    }
  }
}

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  image,
  type = "website",
  jsonLd,
  breadcrumb,
  faq,
  noindex = false,
  price,
  currency = "IRR",
  availability = "InStock",
  publishedTime,
  modifiedTime,
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | فروشگاه تخصصی قطعات یدکی خودرو`;

  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const ogImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_OG_IMAGE;

  warnIfBad("Title", title, 10, 60);
  warnIfBad("Description", description, 50, 160);

  const graph = [];

  if (jsonLd) {
    (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).forEach((s) => graph.push(s));
  }

  if (breadcrumb && breadcrumb.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
      })),
    });
  }

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  const combinedSchema =
    graph.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": graph,
        }
      : null;

  const robotsContent = noindex
    ? "noindex, nofollow"
    : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  return (
    <Helmet>
      <html lang="fa" dir="rtl" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fa-ir" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <meta name="robots" content={robotsContent} />
      <meta name="author" content={SITE_NAME} />
      <meta property="og:type" content={type === "product" ? "product" : type === "article" ? "article" : "website"} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fa_IR" />
      {type === "product" && price && (
        <>
          <meta property="product:price:amount" content={String(price)} />
          <meta property="product:price:currency" content={currency} />
          <meta property="product:availability" content={availability} />
        </>
      )}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {TWITTER_HANDLE && <meta name="twitter:site" content={TWITTER_HANDLE} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {combinedSchema && (
        <script type="application/ld+json">{JSON.stringify(combinedSchema)}</script>
      )}
    </Helmet>
  );
}