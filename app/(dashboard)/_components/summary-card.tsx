import { Skeleton } from "@/app/_components/ui/skeleton";
import { ReactNode } from "react";

export const SummaryCardIcon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-500 bg-opacity-10 text-emerald-500">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-medium text-slate-500"> {children} </p>;
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold text-slate-900"> {children} </p>;
};

export const SummaryCard = ({ children }: { children: ReactNode }) => {
  return <div className="rounded-xl bg-slate-300 p-6"> {children} </div>;
};

export const SumaryCardSkeletron = () => {
  return (
    <Skeleton className="h-[144px] w-full rounded-xl bg-slate-300">
      <div className="space-y-1 px-6 pt-6">
        <Skeleton className="mb-2 h-9 w-9" />
        <Skeleton className="mb-1 h-5 w-[92px]" />
        <Skeleton className="h-8 w-[148px]" />
      </div>
    </Skeleton>
  );
};

export const SumaryCardLastSkeletron = () => {
  return (
    <Skeleton className="h-[144px] w-[524px] rounded-xl bg-slate-300">
      <div className="space-y-1 px-6 pt-6">
        <Skeleton className="mb-2 h-7 w-[120px]" />
        <Skeleton className="mb-1 h-5 w-[105px]" />
      </div>
    </Skeleton>
  );
};
