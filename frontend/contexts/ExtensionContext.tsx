import { createContext } from "react";

interface ExtensionResponse {
  tlsn_id: string;
  currency: string;
  amount: string;
  recipient: string;
  transaction_proof: string;
}

interface ExtensionValues {
  response: ExtensionResponse | null;
  fetchExtensionData: () => void;
}

const defaultValues: ExtensionValues = {
  response: null,
  fetchExtensionData: () => {},
};

const ExtensionContext = createContext<ExtensionValues>(defaultValues);

export default ExtensionContext;
