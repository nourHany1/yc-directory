import { Suspense } from "react";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import markdownit from "markdown-it";

import { formatDate } from "@/lib/formateDate";
// import { getStartupById } from '@/sanity/lib/startup/getStartupById';

import { Skeleton } from "@/components/ui/skeleton";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_ID_QUERY } from "@/sanity/lib/queries";

import View from "@/components/startup/View";
import { client } from "@/sanity/lib/client";
import StartupCard from "@/components/startup/StartupCard";
import { StartupCardType } from "@/types";

// export const experimental_ppr = true; // Enable Partial Prerendering

async function StartupDetails({ params }: { params: Promise<{ id: string }> }) {
  const startupId = (await params).id;

  const md = markdownit();

  type PlaylistType = {
    select?: StartupCardType[];
    // add other properties if needed
  };

  const [post, playlist] = await Promise.all([
    client.fetch(STARTUP_ID_QUERY, { id: startupId }),
    client.fetch<PlaylistType>(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  const editorPosts = playlist?.select ?? [];

  const parsedContent = md.render(post?.pitch || "");

  if (!post) return notFound();

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        {post?.image && (
          <Image
            src={post.image}
            width={1000}
            height={500}
            alt="thumbnail"
            className="rounded-xl mx-auto"
          />
        )}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              {post?.author?.image && (
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
              )}

              <div>
                <p className="text-[20] font-medium">{post?.author?.name}</p>
                <p className="text-[16] font-medium !text-black-300">
                  @{post?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-4xl font-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-[30px] font-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={startupId} />
        </Suspense>
      </section>
    </>
  );
}

export default StartupDetails;
