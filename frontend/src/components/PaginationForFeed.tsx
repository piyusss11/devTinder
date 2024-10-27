import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationForFeed: React.FC<PaginationProps> = ({
  page,
  onNext,
  onPrevious,
}) => {
  return (
    <Pagination className="pb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
          />
        </PaginationItem>
        {page > 1 && (
          <PaginationItem>
            <PaginationLink
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                onPrevious();
              }}
            >
              {page - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink className="text-black" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            {page + 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationForFeed;
