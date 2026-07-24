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
import { getDashboard } from "../_data-access/dashboard/get-dashboard";
import MostsoldProductItem from "./_components/most-sold-product";
import TotalRevenueCards from "./_components/total-revenue-cards";
import { Suspense } from "react";
import TodayRevenueCard from "./_components/today-revenue-card";
import TotalSalesCard from "./_components/total-sales-card";
import TotalStockCard from "./_components/total-stock-card";
import TotalProductsCard from "./_components/total-products-card";

import Last14DaysRevenueCard from "./_components/last-14-days-revenue-card";

const Home = async () => {
  const { mostSoldProducts } = await getDashboard();

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

        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6">
          <p className="mb-4 text-lg font-bold text-[#00A180]">
            Produtos mais vendidos
          </p>
          <div className="space-y-2 overflow-auto">
            {mostSoldProducts.map((prodItem) => (
              <MostsoldProductItem
                key={prodItem.productId}
                product={prodItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
