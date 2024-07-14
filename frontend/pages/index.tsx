"use client";

// import Footer from "@/components/Footer";
import { ExtensionContext } from "@/contexts";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const getHistoryA = async () => {
      console.log("client", client);
      if (client) {
        const response = await (client as any).getHistory("GET", "**");
        console.log("response", response);
      }
    };
    getHistoryA();
  }, [client]);

  useEffect(() => {
    const connectToTLSN = async () => {
      try {
        // @ts-ignore
        //tlsn.disconnect();

        const clientA = await tlsn.connect();

        setClient(clientA);

        //console.log("client", client);
        // Use the client for further interactions
      } catch (error) {
        console.error("Error connecting to TLSN:", error);
      }
    };

    console.log("tlsn AAAA");
    connectToTLSN();

    //@ts-ignore
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden w-full px-6 lg:px-36 bg-bluemidlight">
      <Image
        unoptimized
        fetchPriority="high"
        loading="lazy"
        src="/bkg_desktop.svg"
        alt=""
        width={100}
        height={100}
        className="absolute top-0 right-0 w-full z-0"
      />
      <div className="relative z-10 w-full pt-24 pb-12 lg:pt-[140px] lg:pb-[100px] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-white">
            Take your stand in the
          </h1>
          <h1 className="text-4xl font-bold text-lime-400 mt-2">
            Data Ownership Revolution
          </h1>
          <p className="text-white mt-4">
            Get paid for your <span className="line-through">cookies</span> data
          </p>
          <button className="bg-lime-400 text-blue-900 font-bold py-2 px-4 mt-6 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-lime-500 hover:border-lime-500 transition-all duration-500 ease-in-out">
            Register now
          </button>
        </div>
      </div>

      {/* <div className="w-full max-w-screen-2xl flex flex-col items-center">
        <Footer />
      </div> */}
    </main>
  );
}
