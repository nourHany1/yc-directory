"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export async function createPitch(form: FormData, pitch: string) {
  const session = await auth();
  if (!session)
    return JSON.parse(
      JSON.stringify({
        status: "ERROR",
        error: "Not siged in",
      })
    );

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    let authorId = session.user?.id || session.user?._id || session.id;

    // إذا لم يكن معرف الـ author يبدأ بـ "author-"، ابحث عنه في Sanity
    if (!authorId || !authorId.startsWith("author-")) {
      const authorDoc = await writeClient.fetch(
        '*[_type == "author" && email == $email][0]._id',
        { email: session.user?.email }
      );
      authorId = authorDoc;
    }

    // الآن بعد التأكد من authorId
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: authorId,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    if (authorId) {
      await writeClient
        .patch(authorId)
        .setIfMissing({ startup: [] })
        .append("startup", [{ _type: "reference", _ref: result._id }])
        .commit();
    }

    return JSON.parse(
      JSON.stringify({ ...result, error: "", status: "SUCCESS" })
    );
  } catch (error) {
    console.log("Error creating pitch:", error);
    return JSON.parse(
      JSON.stringify({
        error: JSON.stringify(error),
        status: "ERROR",
      })
    );
  }
}
