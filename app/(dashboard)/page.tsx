import Header, {
  HeaderContainer,
  HeaderLeft,
  HeaderSubTitle,
  HeaderTitle,
} from "../_components/header";

import {
  SumaryCardLastSkeletron,
  SumaryCardSkeletron,
} from "./_components/summary-card";
import TotalRevenueCards from "./_components/total-revenue-cards";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";
import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";
import MostSoldProducts from "./_components/most-sold-products";
import { Skeleton } from "../_components/ui/skeleton";

const Home = async () => {
  return (
    <div className="m-6 flex w-full flex-col space-y-8 rounded-lg">
      <Header>
        <HeaderContainer>
          <HeaderLeft>
            <HeaderSubTitle>Visão geral dos dados</HeaderSubTitle>
            <HeaderTitle>Dashboard</HeaderTitle>
          </HeaderLeft>
        </HeaderContainer>
      </Header>
      <div className="grid grid-cols-2 gap-6">
        <Suspense fallback={<SumaryCardSkeletron />}>
          <TotalRevenueCards />
        </Suspense>

        <Suspense fallback={<SumaryCardSkeletron />}>
          <TodayRevenueCard />
        </Suspense>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Suspense fallback={<SumaryCardSkeletron />}>
          <TotalSalesCard />
        </Suspense>

        <Suspense fallback={<SumaryCardSkeletron />}>
          <TotalStockCard />
        </Suspense>

        <Suspense fallback={<SumaryCardSkeletron />}>
          <TotalProductsCard />
        </Suspense>
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2.5fr),minmax(0,1fr)] gap-6">
        <Suspense fallback={<SumaryCardLastSkeletron />}>
          <Last14DaysRevenueCard />
        </Suspense>

        {/* POSSO COLOCAR EM UM - STREAMING - SUSPENSE */}
        <Suspense fallback="">
          <MostSoldProducts />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
