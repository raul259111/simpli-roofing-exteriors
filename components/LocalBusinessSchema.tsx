export default function LocalBusinessSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://simpliexteriors.com",
    "name": "Simpli Roofing & Exteriors",
    "image": "https://simpliexteriors.com/logo.png",
    "logo": "https://simpliexteriors.com/logo.png",
    "description": "Professional roofing, windows, siding, and aluminum gutter services in Southern Utah. Licensed, bonded, and insured with 30+ years of experience.",
    "url": "https://simpliexteriors.com",
    "telephone": "+18015550123",
    "priceRange": "$$",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "123 Main Street",
        "addressLocality": "St. George",
        "addressRegion": "UT",
        "postalCode": "84770",
        "addressCountry": "US"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "456 Center Street",
        "addressLocality": "Cedar City",
        "addressRegion": "UT",
        "postalCode": "84720",
        "addressCountry": "US"
      }
    ],
    "geo": [
      {
        "@type": "GeoCoordinates",
        "latitude": 37.0965,
        "longitude": -113.5684,
        "name": "St. George Location"
      },
      {
        "@type": "GeoCoordinates",
        "latitude": 37.6775,
        "longitude": -113.0619,
        "name": "Cedar City Location"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "St. George",
        "@id": "https://en.wikipedia.org/wiki/St._George,_Utah"
      },
      {
        "@type": "City",
        "name": "Cedar City",
        "@id": "https://en.wikipedia.org/wiki/Cedar_City,_Utah"
      },
      {
        "@type": "City",
        "name": "Washington"
      },
      {
        "@type": "City",
        "name": "Hurricane"
      },
      {
        "@type": "City",
        "name": "Ivins"
      },
      {
        "@type": "City",
        "name": "Santa Clara"
      },
      {
        "@type": "City",
        "name": "Leeds"
      },
      {
        "@type": "City",
        "name": "La Verkin"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/simpliexteriors",
      "https://www.instagram.com/simpliexteriors",
      "https://www.linkedin.com/company/simpliexteriors"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Exterior Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roofing Services",
            "description": "Professional roof installation, repair, and replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Window Installation",
            "description": "Energy-efficient window replacement and installation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Siding & Stucco",
            "description": "Durable siding and stucco installation services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aluminum Gutters",
            "description": "Seamless aluminum gutter installation and repair"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewBody": "Excellent work on our roof replacement. Professional, on-time, and great quality. Highly recommend!",
        "datePublished": "2024-01-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike Williams"
        },
        "reviewBody": "Best exterior contractor in Southern Utah. Did our siding and gutters - perfect job!",
        "datePublished": "2024-02-20"
      }
    ],
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": 25
    },
    "slogan": "Utah's Premier Exterior Specialists",
    "paymentAccepted": ["Cash", "Check", "Credit Card", "Invoice"],
    "currenciesAccepted": "USD",
    "knowsLanguage": ["en-US", "es-ES"]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

// Service-specific schema component
export function ServiceSchema({ service }: { service: 'roofing' | 'windows' | 'siding' | 'gutters' }) {
  const serviceData = {
    roofing: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Roofing Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Simpli Roofing & Exteriors"
      },
      "areaServed": {
        "@type": "State",
        "name": "Utah"
      },
      "description": "Professional roofing installation, repair, and replacement services in St. George and Cedar City, Utah",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0",
        "description": "Free estimates available"
      }
    },
    windows: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Window Installation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Simpli Roofing & Exteriors"
      },
      "areaServed": {
        "@type": "State",
        "name": "Utah"
      },
      "description": "Energy-efficient window replacement and installation in Southern Utah",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0",
        "description": "Free in-home consultation"
      }
    },
    siding: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Siding & Stucco Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Simpli Roofing & Exteriors"
      },
      "areaServed": {
        "@type": "State",
        "name": "Utah"
      },
      "description": "Professional siding and stucco installation services in St. George and Cedar City",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0",
        "description": "Free estimates and material samples"
      }
    },
    gutters: {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Gutter Installation",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Simpli Roofing & Exteriors"
      },
      "areaServed": {
        "@type": "State",
        "name": "Utah"
      },
      "description": "Seamless aluminum gutter installation and repair in Southern Utah",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "0",
        "description": "Free inspection and estimate"
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData[service]) }}
    />
  )
}