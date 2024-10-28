import { Skeleton } from "@/components/ui/skeleton";

const arr: number[] = [1, 2, 3, 4, 5, 6];

const SkeletonPage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center font-bold text-[#F58F7C] mb-4">
        {" "}
        No Users found
      </h1>
      <div className="flex gap-4 flex-wrap">
        {arr.map((data, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
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
