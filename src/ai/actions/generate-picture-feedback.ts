import { type ProviderBase } from "../providers/provider-base";

export function generatePictureFeedback(
  provider: ProviderBase,
  base64File: string,
  type: string,
) {
  return provider.generatePictureFeedback(base64File, type);
}
