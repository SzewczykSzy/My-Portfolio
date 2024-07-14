import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css"; // Correct import path
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Title",
  description: "Your Description",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
};

export default RootLayout;
