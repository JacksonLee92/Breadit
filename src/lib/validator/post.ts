import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be shorter than 128 characters" }),
  content: z.any(),
  subredditId: z.string(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
