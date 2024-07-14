"use client";

// import Footer from "@/components/Footer";
import { ExtensionContext, ExtensionProvider } from "@/contexts";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Safe4337Pack } from "@safe-global/relay-kit";
import { extractPasskeyData } from "@safe-global/protocol-kit";
 
export default function Home() {

  const [client, setClient] = useState(null);

  async function createPassKey() {

    const displayName = 'Safe SmartAccount'

    const passkeyCredential= await navigator.credentials.create({
      publicKey: {
        pubKeyCredParams: [
          {
            // ECDSA w/ SHA-256: https://datatracker.ietf.org/doc/html/rfc8152#section-8.1
            alg: -7,
            type: 'public-key'
          }
        ],
        challenge: crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: 'Safe SmartAccount'
        },
        user: {
          displayName,
          id: crypto.getRandomValues(new Uint8Array(32)),
          name: displayName
        },
        timeout: 60_000,
        attestation: 'none'
      }
    })

    const passkey = await extractPasskeyData(passkeyCredential as Credential);
    console.log("passkey", passkey);
    return passkey;

  }

  async function connectTlsn(){
    // @ts-ignore
    const clientA = await tlsn.connect();

    setClient(clientA);

  }

  async function getHistory(){

    const response = await (client as any).getHistory("GET", "**")
    console.log("response", response);

  }

  async function getZap(){
      
      const response = await (client as any).getZap("www.twitter.com")
      console.log("response", response);
  
    }




  

  // useEffect(() => {
  //   const getHistoryA = async () => {
  //     console.log("client", client);
  //     if(client){
  //       const response = await (client as any).getHistory("GET", "**")
  //       console.log("response", response);
  //     }
  //   }
  //   getHistoryA();
  // }, [client]);

  // useEffect(() => {
  //   const connectToTLSN = async () => {
  //     try {
  //       // @ts-ignore
  //       //tlsn.disconnect();

  //       const clientA = await tlsn.connect(); 

  //       setClient(clientA); 

        
  //       //console.log("client", client);
  //       // Use the client for further interactions
  //     } catch (error) {
  //       console.error("Error connecting to TLSN:", error);
  //     }
  //   };

  //   console.log("tlsn AAAA");
  //   connectToTLSN();

  // //@ts-ignore
  // }, []);

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
      <button onClick={createPassKey}>Create Passkey</button>
      <button onClick={connectTlsn}>Connect TLSN</button>
      <button onClick={getHistory}>Get History</button>
      <button onClick={getZap}>GetZap</button>


      {/* <div className="w-full max-w-screen-2xl flex flex-col items-center">
        <Footer />
      </div> */}
    </main>
  );
}
