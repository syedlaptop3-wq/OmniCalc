import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  schemaType?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, keywords, schemaType = "Calculator" }) => {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${window.location.pathname}#${location.pathname}`;

  useEffect(() => {
    // 1. Title
    document.title = `${title} | OmniCalc`;
    
    // 2. Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Meta Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords.join(', '));
    }

    // 4. Open Graph Tags
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', title);
    setOgTag('og:description', description);
    setOgTag('og:type', 'website');
    setOgTag('og:url', canonicalUrl);
    setOgTag('og:site_name', 'OmniCalc');

    // 5. JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": schemaType, // e.g., "FinancialCalculator" or "Calculator"
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "operatingSystem": "Any",
      "applicationCategory": "UtilitiesApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, canonicalUrl, schemaType]);

  return null;
};
