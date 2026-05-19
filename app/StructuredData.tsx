"use client";

import Script from "next/script";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ntuthuko Smith",
  alternateName: "Ntuthuko Hugh Smith",
  jobTitle: "Software Engineer",
  description:
    "Software engineer from South Africa building technically sound and meaningfully crafted digital products.",
  url: "https://ntuthukosmith.com",
  email: "build@ntuthukosmith.com",
  telephone: "+27-67-711-5581",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZA"
  },
  sameAs: [
    "https://www.linkedin.com/in/ntuthuko-hugh-smith-37191022a",
    "https://github.com/ntuthukosmithdev"
  ],
  knowsAbout: [
    "React",
    "Node.js",
    "Django",
    "Python",
    "JavaScript",
    "TypeScript",
    "Full-Stack Development",
    "Web Development"
  ]
};

export default function StructuredData() {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
