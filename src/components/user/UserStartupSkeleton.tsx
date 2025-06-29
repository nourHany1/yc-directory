import { Skeleton } from "../ui/skeleton";

function UserStartupSkeleton({ count }: { count: number | null }) {
  return (
    <>
      {Array.from({ length: count || 5 }).map((_, i) => (
        <li key={i}>
          <Skeleton className="startup-card_skeleton" />
        </li>
      ))}
    </>
  );
}

export default UserStartupSkeleton;
