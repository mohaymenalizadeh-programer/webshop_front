import React from 'react'
import Homepage from './Homepage.jsx';
import Category from './Category.jsx';
import Carbrand from './Carbrand.jsx';
import Shophomepage from './Shophomepage.jsx';
import Whyus from './Whyus.jsx';
import SEO from './SEO.jsx';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  "name": "یدک‌کان",
  "alternateName": ["یدکان", "یدک کان", "Yadakkan", "Yadak Kan"],
  "url": "https://yadakkan.ir",
  "logo": "https://yadakkan.ir/images/file_00000000d92c821091953a54a7adc125.png",
  "description": "یدک‌کان، فروشگاه تخصصی قطعات یدکی خودرو با ضمانت اصالت کالا، بهترین قیمت بازار و ارسال سریع به سراسر ایران.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+98-21-12345678",
    "contactType": "customer service",
    "areaServed": "IR",
    "availableLanguage": "Persian"
  },
  "sameAs": [
    "https://instagram.com/yourpage",
    "https://t.me/yourchannel"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "یدک‌کان",
  "alternateName": ["یدکان", "یدک کان"],
  "url": "https://yadakkan.ir",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yadakkan.ir/shops?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <div>
      <SEO
        title="یدک‌کان | فروشگاه تخصصی قطعات یدکی خودرو"
        description="یدک‌کان (یدکان)، خرید آنلاین انواع قطعات اصلی و یدکی خودرو با بهترین قیمت بازار، ضمانت اصالت کالا و ارسال سریع به سراسر ایران."
        keywords="یدک کان, یدکان, یدک‌کان, yadakkan, لوازم یدکی خودرو, قطعات یدکی خودرو, خرید آنلاین لوازم یدکی, لوازم یدکی اصلی, قیمت لوازم یدکی خودرو, فروشگاه قطعات خودرو"
        canonical="/"
        jsonLd={[organizationSchema, websiteSchema]}
      />
      <Homepage/>
      <Category/>
      <Carbrand/>
      <Shophomepage/>
      <Whyus/>
    </div>
  )
}