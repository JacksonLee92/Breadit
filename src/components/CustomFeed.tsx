import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";

const CustomFeed = async () => {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      subreddit: true,
    },
  });
  const posts = await db.post.findMany({
    where: {
      subredditId: {
        in: followedCommunities.map((community) => community.subredditId),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subreddit: true,
      author: true,
      votes: true,
      comments: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

    const allPosts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subreddit: true,
      author: true,
      votes: true,
      comments: true,
    },
    take: INFINITE_SCROLL_PAGINATION_RESULTS,
  });

  // if(!posts) return <PostFeed initialPosts={allPosts}  />

  return <PostFeed initialPosts={allPosts} userId={session?.user?.id} />;
};

export default CustomFeed;
