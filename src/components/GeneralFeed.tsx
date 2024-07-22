import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import React from "react";
import PostFeed from "./PostFeed";

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
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
  return <PostFeed initialPosts={posts} />;
};

export default GeneralFeed;
