import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

import { PICTURE_FEEDBACK_SYSTEM_PROMPT } from "~/ai/prompts";

export const openAi = {
  async generatePictureFeedback(base64File: string, type: string) {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      temperature: 1,
      maxTokens: 300,
      messages: [
        {
          role: "system",
          content: PICTURE_FEEDBACK_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: [
            { type: "image", image: base64File },
            { type: "text", text: type },
          ],
        },
      ],
    });

    return result.text;
  },
};
