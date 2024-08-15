import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generatePictureFeedback, openAi } from "~/ai";
import { compressImage } from "~/server/libs";
import { getBase64ImageData } from "~/utils";

export const chatRouter = createTRPCRouter({
  feedback: publicProcedure
    .input(
      z.object({
        file: z.string(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const fileBuffer = getBase64ImageData(input.file);
      const imageCompressed = await compressImage(fileBuffer);
      const result = await generatePictureFeedback(
        openAi,
        imageCompressed,
        input.type,
      );
      return {
        result,
      };
    }),
});
