import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

export const metadata: Metadata = {
  title: "Silber Arrows | Premium Mercedes-Benz Service Center Dubai",
  description: "Silberarrows is a leading independent Mercedes-Benz service center in Dubai, specializing in repair, maintenance, and diagnostics.",
  keywords: "Mercedes-Benz, service center, Dubai, automotive, repair, maintenance, diagnostics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </head>
      <body className={montserrat.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
