import { auth } from "@/auth";
import SearchForm from "@/components/home/SearchForm";
import StartupCard from "@/components/startup/StartupCard";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

import { StartupCardType } from "@/types";

type SearchParams = {
  searchParams: Promise<{ query?: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query } = await searchParams;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });
  const session = await auth();
  console.log(session?.id);

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-[30px] font-semibold">
          {query ? `search result for ${query} ` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post, i) => (
              <StartupCard
                key={post?._id ?? i}
                post={post as StartupCardType}
              />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
