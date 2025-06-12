import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'UniGen Ai',
  description: 'Convert and speak Roman Marathi in Devanagari.',
  icons: {
    icon: '/unigneAi.png',
  },
};
export default function RootLayout({ children }) {
  return (
   
    <html lang="en">
      <head>
        {/* ✅ Razorpay Checkout Script */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AuthProvider>
        {children}
       </AuthProvider>
      </body>
    </html>
  
  );
}
