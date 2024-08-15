export type ProviderBase = {
  generatePictureFeedback: (
    base64File: string,
    type: string,
  ) => Promise<string>;
};
