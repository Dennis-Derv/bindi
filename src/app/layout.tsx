import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "../components/MainLayout";

export const metadata: Metadata = {
  title: "Bindir Knowledge Development Centre International (BKC) | Official Platform",
  description: "Official portal of BKC International (CAC/IT/NO 56020). Partnering with international grantmakers, donors, and sponsors to provide quality basic education, out-of-school girls outreach, and teacher capacity building across Nigeria.",
  keywords: [
    "BKC",
    "Bindir Knowledge Development Centre",
    "Engr Umar B Bindir",
    "Adamawa State NGO",
    "Nigeria Grants and Sponsorships",
    "Basic Education Grants",
    "Girl Child Education Nigeria",
    "Headmasters National Conference",
    "Yola Community Development"
  ],
  openGraph: {
    title: "Bindir Knowledge Development Centre International (BKC)",
    description: "Quality Basic Education, ICT Edutainment, and Community Development for Underprivileged Children.",
    url: "https://bkc.org.ng",
    siteName: "BKC International",
    images: [
      {
        url: "/uploads/training-lab-workstations-1.png",
        width: 1200,
        height: 630,
        alt: "BKC Computer & Training Lab"
      }
    ],
    locale: "en_NG",
    type: "website"
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut: "/favicon.ico"
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "BKC International",
    statusBarStyle: "black-translucent",
    capable: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="apple-mobile-web-app-title" content="BKC International" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#040B18" />
      </head>
      <body>
        <div className="ambient-glow" aria-hidden="true">
          <div className="glow-orb-1" />
          <div className="glow-orb-2" />
          <div className="glow-orb-3" />
        </div>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
