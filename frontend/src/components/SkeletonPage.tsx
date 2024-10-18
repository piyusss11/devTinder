import { Skeleton } from "@/components/ui/skeleton";

const arr: number[] = [1, 2, 3, 4, 5, 6];

const SkeletonPage = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {arr.map((data, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonPage;

export function SkeletonCard() {
  return (
    <div className="flex space-y-3">
      <Skeleton className="h-[300px] w-[472px] rounded-xl" />
    </div>
  );
}
