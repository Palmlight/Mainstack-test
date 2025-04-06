import { useQuery } from "@tanstack/react-query";
import Button from "../Button/Button";
import TransactionListing from "./TransactionListing";
import { ITransaction } from "../../interfaces/transactions.interface";
import { useUrlState } from "../../hooks/useUrlState";

const Transactions = () => {
  const { onChange } = useUrlState();
  const { data } = useQuery<ITransaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await fetch("https://fe-task-api.mainstack.io/transactions");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    }
  });

  return (
    <section className="mt-16">
      <header className="pb-6 border-b border-[#EFF1F6] flex items-center justify-between">
        <div className="">
          <h1 className="text-[#131316] text-2xl font-bold">24 Transactions</h1>
          <h2 className="text-[#56616B] text-sm font-medium">
            Your transactions for the last 7 days
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            title="Filter"
            rightIcon={<img src="/icons/chevron-down.svg" />}
            variant="secondary"
            className="py-3 pl-7 pr-5 w-fit"
            onClick={() => onChange("filter")("true")}
          />

          <Button
            title="Export list"
            rightIcon={<img src="/icons/download.svg" />}
            variant="secondary"
            className="py-3 pl-7 pr-5 flex-shrink-0 w-fit"
          />
        </div>
      </header>

      <TransactionListing transactions={data || []} />
    </section>
  );
};

export default Transactions;
