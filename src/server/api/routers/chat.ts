import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generatePictureFeedback, openAi } from "~/ai";

export const chatRouter = createTRPCRouter({
  feedback: publicProcedure
    .input(
      z.object({
        base64file: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await generatePictureFeedback(
        openAi,
        input.base64file,
        input.type,
      );
      return {
        result,
      };
    }),
});
