import { useQuery } from "@tanstack/react-query";
import Button from "../Button/Button";
import TransactionListing from "./TransactionListing";
import { ITransaction } from "../../interfaces/transactions.interface";
import { useUrlState } from "../../hooks/useUrlState";
import moment from "moment";

const Transactions = () => {
  const { onChange, value, valueArr } = useUrlState();
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

  const startDate = value("startDate");
  const endDate = value("endDate");
  const types = valueArr("types");
  const statuses = valueArr("status");

  const activeFiltersCount = [
    startDate,
    types?.length > 0,
    statuses?.length > 0
  ].filter(Boolean).length;

  const filteredData = data?.filter(transaction => {
    const transactionDate = moment(transaction.date);

    const isWithinDateRange =
      (!startDate || transactionDate.isSameOrAfter(moment(startDate))) &&
      (!endDate || transactionDate.isSameOrBefore(moment(endDate)));

    const matchesType =
      !types?.length ||
      types
        .map(type => type.toLowerCase())
        .includes(transaction.type.toLowerCase());

    const matchesStatus =
      !statuses?.length ||
      statuses
        .map(status => status.toLowerCase())
        .includes(transaction.status.toLowerCase());

    return isWithinDateRange && matchesType && matchesStatus;
  });

  return (
    <section className="mt-16">
      <header className="pb-6 border-b border-[#EFF1F6] flex items-center justify-between">
        <div className="">
          <h1 className="text-[#131316] text-2xl font-bold">
            {filteredData?.length} Transactions
          </h1>
          <h2 className="text-[#56616B] text-sm font-medium">
            {endDate
              ? `Your transactions for last ${moment(endDate).diff(
                  startDate,
                  "days"
                )} days`
              : "Your transactions for All Time"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            className="py-3 pl-7 pr-5 w-fit"
            onClick={() => onChange("filter")("true")}
          >
            <div className="flex items-center gap-1">
              <p>
                Filter
                {!!activeFiltersCount && (
                  <span className="bg-[#131316] ml-1 w-5 h-5 rounded-full inline-flex items-center justify-center text-white text-xs">
                    {activeFiltersCount}
                  </span>
                )}
              </p>

              <img src="/icons/chevron-down.svg" />
            </div>
          </Button>

          <Button
            title="Export list"
            rightIcon={<img src="/icons/download.svg" />}
            variant="secondary"
            className="py-3 pl-7 pr-5 flex-shrink-0 w-fit"
          />
        </div>
      </header>

      <TransactionListing transactions={filteredData || []} />
    </section>
  );
};

export default Transactions;
