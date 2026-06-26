import type { Metadata } from "next";
import { Inter, Crimson_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import NetworkBackground from "@/components/NetworkBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parth K. Thaker - AI Research Engineer | Graph Theory & Optimization",
  description:
    "AI Research Engineer at Intuitive Surgical. Ph.D. in Electrical Engineering from ASU. Specializing in nonconvex optimization, graph theory, bandit learning, and secure LLM workflows.",
  keywords: [
    "Parth Thaker",
    "AI Research Engineer",
    "Graph Theory",
    "Nonconvex Optimization",
    "Bandit Learning",
    "Reinforcement Learning",
    "Machine Learning",
    "Intuitive Surgical",
    "Arizona State University",
    "ASU",
    "IIT Madras",
    "Electrical Engineering",
    "LLM",
    "Secure AI",
    "Research Portfolio",
  ],
  authors: [{ name: "Parth K. Thaker" }],
  creator: "Parth K. Thaker",
  publisher: "Parth K. Thaker",
  metadataBase: new URL("https://parththaker.github.io"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parththaker.github.io",
    title: "Parth K. Thaker - AI Research Engineer | Graph Theory & Optimization",
    description:
      "AI Research Engineer at Intuitive Surgical. Ph.D. in Electrical Engineering from ASU. Specializing in nonconvex optimization, graph theory, bandit learning, and secure LLM workflows.",
    siteName: "Parth K. Thaker",
    images: [
      {
        url: "/profile_photo.png",
        width: 1200,
        height: 630,
        alt: "Parth K. Thaker - AI Research Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth K. Thaker - AI Research Engineer | Graph Theory & Optimization",
    description:
      "AI Research Engineer at Intuitive Surgical. Ph.D. in Electrical Engineering from ASU. Specializing in nonconvex optimization, graph theory, bandit learning, and secure LLM workflows.",
    creator: "@ParthKThaker",
    images: ["/profile_photo.png"],
  },
  verification: {
    google: "vR0MHUqGDsFvNBkYnX5muEopmvKabsrcthb-7WDj6nI",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimsonPro.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Parth K. Thaker",
              jobTitle: "AI Research Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Intuitive Surgical",
                url: "https://www.intuitive.com",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "Arizona State University",
                  url: "https://www.asu.edu",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "Indian Institute of Technology Madras",
                  url: "https://www.iitm.ac.in",
                },
              ],
              url: "https://parththaker.github.io",
              image: "https://parththaker.github.io/profile_photo.png",
              sameAs: [
                "https://www.linkedin.com/in/parththaker1/",
                "https://twitter.com/ParthKThaker",
                "https://github.com/parththaker",
              ],
              knowsAbout: [
                "Graph Theory",
                "Nonconvex Optimization",
                "Bandit Learning",
                "Reinforcement Learning",
                "Machine Learning",
                "Artificial Intelligence",
                "Electrical Engineering",
              ],
              hasCredential: {
                "@type": "EducationalOccupationalCredential",
                name: "Ph.D. in Electrical Engineering",
                credentialCategory: "degree",
              },
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <NetworkBackground />
        <SiteNav />
        <main className="relative z-10 flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
