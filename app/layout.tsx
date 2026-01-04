import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Nishat Ayub",
  description: "Portfolio & Creative Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Aldrich&family=Alumni+Sans+SC:ital,wght@0,100..900;1,100..900&family=Audiowide&family=Fredericka+the+Great&family=Fredoka:wdth,wght@87.5,300..700&family=Funnel+Sans:ital,wght@0,300..800;1,300..800&family=Patrick+Hand+SC&family=Prosto+One&family=Stack+Sans+Text:wght@200..700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
