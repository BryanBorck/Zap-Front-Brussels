"use client";

// import Footer from "@/components/Footer";
import { ExtensionContext } from "@/contexts";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  // const { response } = useContext(ExtensionContext);
  // const [history, setHistory] = useState(null);
  // const [error, setError] = useState(null);

  // function getHistoryFromExtension(
  //   method: any,
  //   url: any,
  //   metadata: any = null
  // ) {
  //   return new Promise((resolve, reject) => {
  //     // Create a unique request ID
  //     const requestId = Math.random().toString(36).substr(2, 9);

  //     // Listen for the response
  //     function handleResponse(event: any) {
  //       if (
  //         event.data &&
  //         event.data.tlsnrpc === "1.0" &&
  //         event.data.id === requestId
  //       ) {
  //         window.removeEventListener("message", handleResponse);
  //         console.log("event.data", event.data);
  //         if (event.data.error) {
  //           reject(event.data.error);
  //         } else {
  //           resolve(event.data.result);
  //         }
  //       }
  //     }

  //     window.addEventListener("message", handleResponse);

  //     // Send the request
  //     window.postMessage(
  //       {
  //         tlsnrpc: "1.0",
  //         id: requestId,
  //         method: "tlsn/cs/connect",
  //         params: {
  //           method,
  //           url,
  //           metadata,
  //         },
  //       },
  //       "*"
  //     );
  //   });
  // }

  // const handleFetchHistory = async () => {
  //   try {
  //     const result: any = await getHistoryFromExtension(
  //       "GET",
  //       "https://example.com",
  //       null
  //     );
  //     setHistory(result);
  //     setError(null);
  //   } catch (err: any) {
  //     setError(err.message);
  //     setHistory(null);
  //   }
  // };

  useEffect(() => {
    const connectToTLSN = async () => {
      try {
        // @ts-ignore
        const client = await tlsn.connect();
        console.log("client", client);
        // Use the client for further interactions
      } catch (error) {
        console.error("Error connecting to TLSN:", error);
      }
    };
    connectToTLSN();
  }, []);

  // // @ts-ignore
  // const client = await window.tlsn.connect();

  // // @ts-ignore
  // console.log("client", client);

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden w-full px-6 lg:px-36">
      {/* <Image
        unoptimized
        fetchPriority="high"
        loading="lazy"  
        src="/vectors/bkg-lines.svg"
        alt=""
        width={100}
        height={100}
        className="absolute lg:-top-[100px] right-0 w-full z-0"
      /> */}
      <div className="relative z-10 w-full pt-24 pb-12 lg:pt-[140px] lg:pb-[100px]">
        <p className="text-red-500">aaa HOME</p>
      </div>

      {/* <div className="w-full max-w-screen-2xl flex flex-col items-center">
        <Footer />
      </div> */}
    </main>
  );
}
