"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SlideBottom } from "../../components/Slide";
import Link from "next/link";
import React from "react";

export default function AppPage() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const getHistoryA = async () => {
      console.log("client", client);
      if (client) {
        // const response = await (client as any).getHistory("GET", "**");
        const response = await (client as any).getZap();
        console.log("response", response);
      }
    };
    getHistoryA();
  }, [client]);

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
      <Image
        unoptimized
        fetchPriority="high"
        loading="lazy"
        src="/ZapNetwork.png"
        alt=""
        width={100}
        height={100}
        className="absolute top-6 left-6 h-12 w-auto z-20"
      />
      <div className="relative z-10 w-full pt-24 pb-12 lg:pt-[180px] lg:pb-[100px] flex items-center justify-center">
        <div className="text-center p-8">
          {/* <SlideBottom delay={0.2} className="text-4xl font-bold text-lime-400">
            Self Custodial Data Layer
          </SlideBottom> */}
          <div className="w-[1000px] rounded-md bg-black/15 backdrop-blur-md shadow-xl p-12 flex flex-col items-center justify-start">
            <SlideBottom
              delay={0.4}
              className="text-2xl font-bold text-lime-400"
            >
              Get the proof of your accounts
            </SlideBottom>
            <div className="flex flex-col items-center space-y-6 mt-12">
              <div className="flex flex-row space-x-6 items-center">
                <Image
                  unoptimized
                  fetchPriority="high"
                  loading="lazy"
                  src="/X_logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[2em] h-[2em]"
                />
                <p className="text-white text-[1.5em] font-bold">Twitter</p>
                <button
                  onClick={connectToTLSN}
                  className={`text-[1.5em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-2 px-4 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-blue-900 hover:border-blue-900 transition-all duration-500 ease-in-out`}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
          {/* <SlideBottom
            delay={0.4}
            className="text-4xl font-bold text-white mt-2"
          >
            Own your data, own your assets.
          </SlideBottom>
          <SlideBottom delay={0.5} className="text-white mt-4">
            Get <span className="line-through">really</span> paid.
          </SlideBottom>
          <SlideBottom
            delay={0.7}
            className="cursor-pointer bg-lime-400 text-blue-900 font-bold py-2 px-4 mt-12 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-lime-500 hover:border-lime-500 transition-all duration-500 ease-in-out"
          >
            <Link href="/extension">Start now</Link>
          </SlideBottom>
          <SlideBottom
            delay={0.8}
            className="cursor-pointer bg-blue-900 text-lime-400 font-bold py-2 px-4 mt-6 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-blue-900 hover:border-blue-900 transition-all duration-500 ease-in-out"
          >
            <Link href="/">Download Extension</Link>
          </SlideBottom> */}
        </div>
      </div>
    </main>
  );
}
