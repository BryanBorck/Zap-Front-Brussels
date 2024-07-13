import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Head from "next/head";
// import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { ExtensionProvider } from "@/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Z2Z",
  description: "Zap Desktop P2P App - HH Brussels 2024",
};

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <ExtensionProvider>
      <Head>
        <title>Zap</title>
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" /> */}
      </Head>
      {/* <Header /> */}
      <Component {...pageProps} />
      <Toaster />
    </ExtensionProvider>
  );
}

export default MyApp;
