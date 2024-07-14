"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SlideBottom } from "../../components/Slide";
import Link from "next/link";
import React from "react";
import { CircleX, CircleCheckBig, Loader2 } from "lucide-react";
import { Safe4337Pack } from '@safe-global/relay-kit'
import {  PasskeyArgType, extractPasskeyData } from '@safe-global/protocol-kit'
import { encodeFunctionData } from 'viem'

const RP_NAME = 'Safe Smart Account'
const USER_DISPLAY_NAME = 'Luiz'
const USER_NAME = 'Luiz'

export const STORAGE_PASSKEY_LIST_KEY = 'safe_passkey_list'
export const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com'
export const CHAIN_NAME = 'sepolia'
export const PAYMASTER_ADDRESS = '0x0000000000325602a77416A16136FDafd04b299f' // SEPOLIA
export const BUNDLER_URL = `https://api.pimlico.io/v1/${CHAIN_NAME}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
export const PAYMASTER_URL = `https://api.pimlico.io/v2/${CHAIN_NAME}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`
export const NFT_ADDRESS = '0xBb9ebb7b8Ee75CDBf64e5cE124731A89c2BC4A07'


export default function AppPage() {
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState([0, 0, 0, 0]);
  const [client, setClient] = useState(null);
  const [selected, setSelected] = useState("");
  const [index, setIndex] = useState(0);
  const [passkey, setPasskey] = useState<any>(null);


  const [passkeyCredential, setPasskeyCredential] = useState<any>(null);

  async function createPasskey (): Promise<PasskeyArgType> {
    const displayName = 'Safe Owner' // This can be customized to match, for example, a user name.
    // Generate a passkey credential using WebAuthn API
    const passkeyCredential = await navigator.credentials.create({
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
  
    if (!passkeyCredential) {
      throw Error('Passkey creation failed: No credential was returned.')
    }
    console.log('passkeyCredential: ', passkeyCredential)
  
    const passkey = await extractPasskeyData(passkeyCredential)

    

    setPasskey(passkey);
    console.log("Created Passkey: ", passkey)
  
    return passkey
  }

  const mintNFT = async () => {
    const safe4337Pack = await Safe4337Pack.init({
      provider: RPC_URL,
      signer: passkey,
      bundlerUrl: BUNDLER_URL,
      paymasterOptions: {
        isSponsored: true,
        paymasterUrl: PAYMASTER_URL,
        paymasterAddress: PAYMASTER_ADDRESS,
        sponsorshipPolicyId: 'sp_early_synch'
      },
      options: {
        owners: [
          /* Other owners... */
        ],
        threshold: 1
      }
    })

    const safeAddress = await safe4337Pack.protocolKit.getAddress();


  
    const mintNFTTransaction = {
      to: NFT_ADDRESS,
      data: encodeSafeMintData(safeAddress),
      value: '0'
    }
  
    const safeOperation = await safe4337Pack.createTransaction({
      transactions: [mintNFTTransaction]
    })
  
    const signedSafeOperation = await safe4337Pack.signSafeOperation(
      safeOperation
    )
  
    console.log('SafeOperation', signedSafeOperation)
  
    // 4) Execute SafeOperation
    const userOperationHash = await safe4337Pack.executeTransaction({
      executable: signedSafeOperation
    })
  
    return userOperationHash
  }
  
  /**
   * Encodes the data for a safe mint operation.
   * @param to The address to mint the token to.
   * @param tokenId The ID of the token to mint.
   * @returns The encoded data for the safe mint operation.
   */
  function encodeSafeMintData(
    to: string,
    tokenId: bigint = getRandomUint256()
  ): string {
    return encodeFunctionData({
      abi: [
        {
          constant: false,
          inputs: [
            {
              name: 'to',
              type: 'address'
            },
            {
              name: 'tokenId',
              type: 'uint256'
            }
          ],
          name: 'safeMint',
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      functionName: 'safeMint',
      args: [to, tokenId]
    })
  }
  
  /**
   * Generates a random 256-bit unsigned integer.
   *
   * @returns {bigint} A random 256-bit unsigned integer.
   *
   * This function uses the Web Crypto API's `crypto.getRandomValues()` method to generate
   * a uniformly distributed random value within the range of 256-bit unsigned integers
   * (from 0 to 2^256 - 1).
   */
  function getRandomUint256(): bigint {
    const dest = new Uint8Array(32) // Create a typed array capable of storing 32 bytes or 256 bits
  
    crypto.getRandomValues(dest) // Fill the typed array with cryptographically secure random values
  
    let result = BigInt(0);
    for (let i = 0; i < dest.length; i++) {
      result |= BigInt(dest[i]) << BigInt(8 * i) // Combine individual bytes into one bigint
    }
  
    return result
  }



  const incrementStep = (index: any) => {
    const newSteps = [...steps];
    newSteps[index] += 1;
    setSteps(newSteps);
  };

  const handleMint = async (value: number) => {
    console.log("client", client);
    if (client) {
      const response = await (client as any).mintAttestation("", "", "");
      console.log("response", response);
    }
    incrementStep(value);
  };

  const handleZap = async (value: number) => {
    console.log("client", client);
    if (client) {
      let url = "";
      if (selected === "Instagram") {
        url = "www.instagram.com";
      }
      if (selected === "Twitter") {
        url = "www.x.com";
      }
      if (selected === "Google") {
        url = "www.mail.google.com";
      }
      if (selected === "Discord") {
        url = "";
      }
      console.log("url", url);
      const response = await (client as any).getZap(url);
      console.log("response", response);
    }
    incrementStep(value);
    setSelected("");
  };

  const connectToTLSN = async (value: number) => {
    try {
      // @ts-ignore
      //tlsn.disconnect();

      console.log("connecting to TLSN");

      // @ts-ignore
      const clientA = await tlsn.connect();

      setClient(clientA);

      //console.log("client", client);
      // Use the client for further interactions
      incrementStep(value);
    } catch (error) {
      console.error("Error connecting to TLSN:", error);
    }
  };

  const handleClick = async (value: number) => {
    setIndex(value);
    switch (value) {
      case 0:
        setSelected("Instagram");
        break;
      case 1:
        setSelected("Twitter");
        break;
      case 2:
        setSelected("Google");
        break;
      case 3:
        setSelected("Discord");
        break;
      default:
        break;
    }
    setLoading(true);
    if (steps[value] === 0) {
      await connectToTLSN(value);
    }
    if (steps[value] === 1) {
      await handleZap(value);
    }
    if (steps[value] === 2) {
      await handleMint(value);
    }
    setLoading(false);
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
      <div className="relative z-10 w-full pt-24 pb-12 lg:pt-[120px] flex items-center justify-center">
        <div className="text-center p-8">
          {/* <SlideBottom delay={0.2} className="text-4xl font-bold text-lime-400">
            Self Custodial Data Layer
          </SlideBottom> */}
          <div className="w-[1000px] rounded-md bg-black/15 backdrop-blur-md shadow-xl p-12 flex flex-col items-center justify-start">
            <SlideBottom
              delay={0.2}
              className="text-2xl font-bold text-lime-400"
            >
              Get the proof of your accounts
            </SlideBottom>
            <div className="flex flex-col items-center space-y-6 mt-12">
              {/* Instagram */}

              <SlideBottom
                delay={0.4}
                className="flex flex-row space-x-6 items-center"
              >
                <Image
                  unoptimized
                  fetchPriority="high"
                  loading="lazy"
                  src="/Instagram_logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[1.75em] h-[1.75em]"
                />
                <div className="w-[200px] text-white text-[1.25em] font-bold">
                  Instagram
                </div>
                <button
                  disabled={
                    loading || (selected !== "Instagram" && selected !== "")
                  }
                  onClick={() => handleClick(0)}
                  className={`${
                    loading
                      ? ""
                      : "hover:bg-transparent hover:text-blue-900 hover:border-blue-900"
                  } text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  {loading && index === 1 ? (
                    <div className="flex flex-row items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : steps[0] === 1 ? (
                    <p>Request Proof</p>
                  ) : steps[0] > 1 ? (
                    <p>Mint Proof</p>
                  ) : (
                    <p>Connect</p>
                  )}
                </button>
                <div className="ml-8">
                  {steps[0] < 2 ? (
                    <CircleX size={20} />
                  ) : (
                    <CircleCheckBig size={20} />
                  )}
                </div>
              </SlideBottom>

              {/* Twitter */}

              <SlideBottom
                delay={0.6}
                className="flex flex-row space-x-6 items-center"
              >
                <Image
                  unoptimized
                  fetchPriority="high"
                  loading="lazy"
                  src="/X_logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[1.75em] h-[1.75em]"
                />
                <div className="w-[200px] text-white text-[1.25em] font-bold">
                  Twitter
                </div>
                <button
                  disabled={
                    loading || (selected !== "Twitter" && selected !== "")
                  }
                  onClick={() => handleClick(1)}
                  className={`${
                    loading
                      ? ""
                      : "hover:bg-transparent hover:text-blue-900 hover:border-blue-900"
                  } text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  {loading && index === 1 ? (
                    <div className="flex flex-row items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : steps[1] === 1 ? (
                    <p>Request Proof</p>
                  ) : steps[1] > 1 ? (
                    <p>Mint Proof</p>
                  ) : (
                    <p>Connect</p>
                  )}
                </button>
                <div className="ml-8">
                  {steps[1] < 2 ? (
                    <CircleX size={20} />
                  ) : (
                    <CircleCheckBig size={20} />
                  )}
                </div>
              </SlideBottom>

              {/* Google */}

              <SlideBottom
                delay={0.8}
                className="flex flex-row space-x-6 items-center"
              >
                <Image
                  unoptimized
                  fetchPriority="high"
                  loading="lazy"
                  src="/Google_logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[1.75em] h-[1.75em]"
                />
                <div className="w-[200px] text-white text-[1.25em] font-bold">
                  Google
                </div>
                <button
                  disabled={
                    loading || (selected !== "Google" && selected !== "")
                  }
                  onClick={() => handleClick(2)}
                  className={`${
                    loading
                      ? ""
                      : "hover:bg-transparent hover:text-blue-900 hover:border-blue-900"
                  } text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  {loading && index === 2 ? (
                    <div className="flex flex-row items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : steps[2] === 1 ? (
                    <p>Request Proof</p>
                  ) : steps[2] > 1 ? (
                    <p>Mint Proof</p>
                  ) : (
                    <p>Connect</p>
                  )}
                </button>
                <div className="ml-8">
                  {steps[2] < 2 ? (
                    <CircleX size={20} />
                  ) : (
                    <CircleCheckBig size={20} />
                  )}
                </div>
              </SlideBottom>

              {/* Twitter */}

              <SlideBottom
                delay={1}
                className="flex flex-row space-x-6 items-center"
              >
                <Image
                  unoptimized
                  fetchPriority="high"
                  loading="lazy"
                  src="/Discord_logo.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="w-[1.75em] h-[1.75em]"
                />
                <div className="w-[200px] text-white text-[1.25em] font-bold">
                  Discord
                </div>
                <button
                  disabled={
                    loading || (selected !== "Discord" && selected !== "")
                  }
                  onClick={() => handleClick(3)}
                  className={`${
                    loading
                      ? ""
                      : "hover:bg-transparent hover:text-blue-900 hover:border-blue-900"
                  } text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  {loading && index === 3 ? (
                    <div className="flex flex-row items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </div>
                  ) : steps[3] === 1 ? (
                    <p>Request Proof</p>
                  ) : steps[3] > 1 ? (
                    <p>Mint Proof</p>
                  ) : (
                    <p>Connect</p>
                  )}
                </button>
                <div className="ml-8">
                  {steps[3] < 2 ? (
                    <CircleX size={20} />
                  ) : (
                    <CircleCheckBig size={20} />
                  )}
                </div>
              </SlideBottom>
              <button
                  onClick={createPasskey}
                  className={`hover:bg-transparent hover:text-blue-900 hover:border-blue-900 text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  Create passkey
                </button>
                <button
                  onClick={mintNFT}
                  className={`hover:bg-transparent hover:text-blue-900 hover:border-blue-900 text-[1.25em] cursor-pointer bg-blue-900 text-lime-400 font-bold py-1 w-[300px] rounded-md shadow-lg border-[2px] border-transparent transition-all duration-500 ease-in-out disabled:border-gray-400 disabled:bg-gray-400 disabled:text-white`}
                >
                  Mint Attestation
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
