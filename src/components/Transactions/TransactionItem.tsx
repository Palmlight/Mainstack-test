import moment from "moment";
import { ITransaction } from "../../interfaces/transactions.interface";
import { cn } from "../../utils/helpers.utils";

const TransactionItem = ({ amount, ...transaction }: Partial<ITransaction>) => {
  const isDeposit = transaction?.type?.toLowerCase() === "deposit";
  const isWithdrawal = transaction?.type?.toLowerCase() === "withdrawal";

  return (
    <div className="flex items-center justify-between">
      <div className="gap-3 items-center flex">
        <div
          className={cn(
            "flex items-center justify-center h-12 w-12 rounded-full",
            {
              "bg-[#E3FCF2]": isDeposit,
              "bg-[#F9E3E0]": isWithdrawal
            }
          )}
        >
          <img
            src={isDeposit ? "/icons/inward.svg" : "/icons/outward.svg"}
            alt="Arrow"
          />
        </div>

        {isDeposit && (
          <div className="space-y-1">
            <h2 className="text-[#131316] font-medium">
              {transaction?.metadata?.product_name || "-"}
            </h2>
            <h3 className="text-sm text-[#56616B]">
              {transaction?.metadata?.name || "-"}
            </h3>
          </div>
        )}

        {isWithdrawal && (
          <div className="space-y-1">
            <h2 className="text-[#131316] font-medium">Cash withdrawal</h2>
            <h3
              className={cn("text-sm capitalize ", {
                "text-[#0EA163]":
                  transaction?.status?.toLowerCase() === "successful",
                "text-[#F9A826]":
                  transaction?.status?.toLowerCase() === "failed",
                "text-[#1EAB8A]": transaction?.status === "completed"
              })}
            >
              {transaction?.status}
            </h3>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h1 className="text-[#131316] font-bold">
          {" "}
          USD{" "}
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }).format(amount || 0)}
        </h1>
        <h2 className="text-right text-sm text-[#56616B]">
          {moment(transaction?.date).format("MMM D, YYYY")}
        </h2>
      </div>
    </div>
  );
};

export default TransactionItem;
