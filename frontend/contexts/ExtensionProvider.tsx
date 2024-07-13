import React, { useEffect, useState, ReactNode } from "react";

import {
  ExtensionEventMessage,
  ExtensionEventVersionMessage,
  ExtensionPostMessage,
  ExtensionReceiveMessage,
} from "@/hooks/useBrowserExtension";

import ExtensionContext from "./ExtensionContext";

interface ProvidersProps {
  children: ReactNode;
}

interface ExtensionResponse {
  tlsn_id: string;
  currency: string;
  amount: string;
  recipient: string;
  transaction_proof: string;
}

const ExtensionProvider = ({ children }: ProvidersProps) => {
  /*
   * Contexts
   */

  // no-op

  /*
   * State
   */

  const [response, setResponse] = useState<ExtensionResponse | null>(null);

  /*
   * Extension Storage Reads
   */

  const fetchExtensionData = () => {
    window.postMessage({ type: ExtensionPostMessage.FETCH_DATA }, "*");

    console.log("Posted Message: ", ExtensionPostMessage.FETCH_DATA);
  };
  /*
   * Handlers
   */

  const handleExtensionMessage = function (event: any) {
    // console.log("Received event in Z2Z:", event);
    if (event.origin !== window.location.origin) {
      return;
    }
    if (event) {
      handleMessageReceived(event);
    }
  };

  const handleMessageReceived = (event: ExtensionEventMessage) => {
    if (event.data && event.data.data && event.data.data.response) {
      const response = event.data.data.response;
      try {
        const response_data =
          typeof response === "string" ? JSON.parse(response) : response;
        const response_valid: ExtensionResponse = response_data.response;
        setResponse(response_valid);
        console.log("Response data:", response_valid);
        console.log("Response data tlsn id:", response_valid.tlsn_id);
      } catch (error) {
        console.error("Error parsing response data:", error);
      }
    }
  };

  /*
   * Hooks
   */

  // useEffect(() => {
  //   fetchExtensionData();
  // }, []);

  useEffect(() => {
    window.addEventListener("message", handleExtensionMessage);

    return () => {
      window.removeEventListener("message", handleExtensionMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExtensionContext.Provider
      value={{
        response,
        fetchExtensionData,
      }}
    >
      {children}
    </ExtensionContext.Provider>
  );
};

export default ExtensionProvider;
