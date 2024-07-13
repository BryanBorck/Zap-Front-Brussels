export type ExtensionEventMessage = {
  origin: string;
  data: {
    type: string;
    status: string;
    data: {
      response: string;
    };
  };
};

export type ExtensionEventVersionMessage = {
  origin: string;
  data: {
    type: string;
    status: string;
    version: string;
  };
};

export const ExtensionPostMessage = {
  FETCH_DATA: "fetch_data",
};

export const ExtensionReceiveMessage = {
  DATA_RESPONSE: "data_response",
};
