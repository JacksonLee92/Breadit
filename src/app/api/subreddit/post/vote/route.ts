import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { PostVoteValidator } from "@/lib/validator/vote";
import { CachedPost } from "@/types/redis";
import { z } from "zod";

const CACHE_AFTER_UPVOTE = 1;
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { postId, voteType } = PostVoteValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const existingVote = await db.vote.findFirst({
      where: {
        userId: session.user.id,
        postId,
      },
    });
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        author: true,
        votes: true,
      },
    });
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    if (existingVote) {
      if (existingVote.type === voteType) {
        await db.vote.delete({
          where: {
            userId_postId: {
              userId: session.user.id,
              postId,
            },
          },
        });
        return new Response("OK");
      }
      await db.vote.update({
        where: {
          userId_postId: {
            userId: session.user.id,
            postId,
          },
        },
        data: {
          type: voteType,
        },
      });

      const votesAmt = post.votes.reduce((acc, vote) => {
        if (vote.type === "UP") return acc + 1;
        if (vote.type === "DOWN") return acc - 1;
        return acc;
      }, 0);

      if (votesAmt >= CACHE_AFTER_UPVOTE) {
        const cachePayload: CachedPost = {
          id: post.id,
          title: post.title,
          authorUsername: post.author.username ?? "",
          content: JSON.stringify(post.content),
          currentVote: voteType,
          createdAt: post.createdAt,
        };

        await redis.hset(`post:${postId}`, cachePayload);
      }
      return new Response("OK");
    }

    await db.vote.create({
      data: {
        userId: session.user.id,
        postId,
        type: voteType,
      },
    });

    const votesAmt = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    if (votesAmt >= CACHE_AFTER_UPVOTE) {
      const cachePayload: CachedPost = {
        id: post.id,
        title: post.title,
        authorUsername: post.author.username ?? "",
        content: JSON.stringify(post.content),
        currentVote: voteType,
        createdAt: post.createdAt,
      };
      await redis.hset(`post:${postId}`, cachePayload);
    }
    return new Response("OK");
  } catch (error) {
             if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response("Could not vote.", { status: 500 });
  }
}
