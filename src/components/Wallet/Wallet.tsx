import { useQuery } from "@tanstack/react-query";
import Button from "../Button/Button";
import TransactionsGraph from "./TransactionsGraph";
import { ITransaction } from "../../interfaces/transactions.interface";

export interface IWallet {
  balance: number;
  ledger_balance: number;
  pending_payout: number;
  total_payout: number;
  total_revenue: number;
}

const Wallet = () => {
  const { data, isLoading } = useQuery<IWallet>({
    queryKey: ["wallet"],
    queryFn: async () => {
      const res = await fetch("https://fe-task-api.mainstack.io/wallet");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }
  });

  const { isLoading: transactionsLoading, data: transactions } = useQuery<
    ITransaction[]
  >({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("https://fe-task-api.mainstack.io/transactions");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }
  });

  const walletDetails = {
    "Ledger Balance": data?.ledger_balance || 0,
    "Total Payout": data?.total_payout || 0,
    "Total Revenue": data?.total_revenue || 0,
    "Pending Payout": data?.pending_payout || 0
  };

  return (
    <section className="flex pt-[140px] w-full justify-between">
      <aside className="w-full max-w-[765px]">
        <section className="w-full max-w-[462px] flex items-center justify-between gap-16">
          <div className="space-y-2 flex-shrink-0">
            <h1 className="text-sm text-[#56616B]">Available Balance</h1>
            {isLoading && (
              <div
                className="h-10 w-full rounded animate-pulse bg-[#56616B30]"
                role="alert"
                aria-label="loading"
              ></div>
            )}
            {!isLoading && (
              <h2 className="text-[36px] text-[#131316] font-bold">
                USD{" "}
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(data?.balance || 0)}
              </h2>
            )}
          </div>

          <div className="w-full flex-shrink-0 max-w-[167px]">
            <Button
              title="Withdraw"
              className="py-[14px] w-full"
              variant="primary"
            />
          </div>
        </section>

        <div className="w-full">
          <TransactionsGraph
            isLoading={transactionsLoading}
            data={transactions || []}
          />
        </div>
      </aside>

      <main className="space-y-8 max-w-[271px] w-full">
        {Object.entries(walletDetails).map(([key, value]) => (
          <div key={key} className="w-full">
            <div className="flex items-center w-full justify-between mb-2">
              <h2 className="text-[#56616B] text-sm">{key}</h2>
              <img src="/icons/info.svg" alt="info" />
            </div>
            {isLoading && (
              <div className="h-10 w-full rounded animate-pulse bg-[#56616B30]"></div>
            )}
            {!isLoading && (
              <p className=" text-[#131316] font-bold text-[28px]">
                USD{" "}
                {new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(value)}
              </p>
            )}
          </div>
        ))}
      </main>
    </section>
  );
};

export default Wallet;
