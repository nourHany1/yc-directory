import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],

  callbacks: {
    async signIn({ user: { email, name, image }, profile }) {
      if (!profile?.id || !email) return false;

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            githubId: profile.id,
            name,
            username: profile.login,
            email,
            image,
            bio: profile.bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });

          if (user?._id) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error in jwt callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.id = token.id;
      }
      return session;
    },
  },
});
