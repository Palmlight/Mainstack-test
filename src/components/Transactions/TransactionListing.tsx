import { ITransaction } from "../../interfaces/transactions.interface";
import Button from "../Button/Button";
import TransactionItem from "./TransactionItem";

const TransactionListing = ({
  transactions = []
}: {
  transactions: ITransaction[];
}) => {
  return (
    <section className="space-y-6 mt-10">
      {!transactions?.length && (
        <div className="w-full max-w-[380px] space-y-8 mx-auto pt-5">
          <div className="w-12 h-12 flex items-center justify-center bg-[linear-gradient(135deg,_#DBDEE6_1.89%,_#F6F7F9_98.77%)] rounded-[16px] ">
            <img src="/icons/receipt.svg" alt="receipt" />
          </div>

          <div className="space-y-2.5">
            <h2 className="text-[24px] font-bold text-[#131316]">
              No matching transaction found for the selected filter
            </h2>

            <h3 className="text-[#56616B] font-medium">
              Change your filters to see more results, or add a new product.
            </h3>
          </div>

          <Button className="w-[120px] h-12" variant="secondary">
            Clear Filter
          </Button>
        </div>
      )}
      {!!transactions?.length && (
        <>
          {transactions?.map((transaction, idx) => (
            <TransactionItem
              key={transaction?.type + transaction?.date + idx}
              {...transaction}
            />
          ))}
        </>
      )}
    </section>
  );
};

export default TransactionListing;
