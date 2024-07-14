"use client";

import Image from "next/image";
import { SlideBottom } from "@/components/Slide";
import Link from "next/link";

export default function Home() {
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
      <Link href="/">
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
      </Link>
      <div className="relative z-10 w-full pt-24 pb-12 lg:pt-[180px] lg:pb-[100px] flex items-center justify-center">
        <div className="text-center p-8">
          <SlideBottom delay={0.2} className="text-4xl font-bold text-lime-400">
            Self Custodial Data Layer
          </SlideBottom>
          <SlideBottom
            delay={0.4}
            className="text-4xl font-bold text-white mt-2"
          >
            Own your data, own your assets.
          </SlideBottom>
          <SlideBottom delay={0.5} className="text-white mt-4">
            Get <span className="line-through">really</span> paid.
          </SlideBottom>
          <Link href="/app">
            <SlideBottom
              delay={0.7}
              className="cursor-pointer bg-lime-400 text-blue-900 font-bold py-2 px-4 mt-12 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-lime-500 hover:border-lime-500 transition-all duration-500 ease-in-out"
            >
              Start now
            </SlideBottom>
          </Link>
          <Link href="/">
            <SlideBottom
              delay={0.8}
              className="cursor-pointer bg-blue-900 text-lime-400 font-bold py-2 px-4 mt-6 rounded-md shadow-lg border-[2px] border-transparent hover:bg-transparent hover:text-blue-900 hover:border-blue-900 transition-all duration-500 ease-in-out"
            >
              Download
            </SlideBottom>
          </Link>
        </div>
      </div>
    </main>
  );
}
