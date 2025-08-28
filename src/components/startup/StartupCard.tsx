"use client";

import { formatDate } from "@/lib/formateDate";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StartupCardType } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

function StartupCard({ post }: { post: StartupCardType }) {
  const {
    _createdAt,
    views,
    author,
    title,
    description,
    image,
    category,
    _id,
  } = post;

  return (
    // Styling based on parent state (group class)
    <li className="startup-card group">
      <div className=" flex justify-between items-center">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-[16px] font-medium">{views}</span>
        </div>
      </div>

      <div className="flex justify-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-[16px] font-medium line-clamp-1">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-[26px] font-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        {author?.image && (
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image || ""}
              alt={author?.name || ""}
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        )}
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <Image
          src={typeof image === "string" ? image : "/fallback-image.png"}
          alt="placeholder"
          width={100}
          height={100}
          className="startup-card_img"
          onError={(e) => {
            e.currentTarget.src = "/fallback-image.png";
          }}
        />
      </Link>

      <div className="flex justify-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-[16px] font-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
}

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
