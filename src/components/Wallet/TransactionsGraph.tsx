import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts";
import moment from "moment";
import { ITransaction } from "../../interfaces/transactions.interface";

const TransactionsGraph = ({
  isLoading,
  data
}: {
  isLoading?: boolean;
  data: Partial<ITransaction>[];
}) => {
  const graphData = data?.length
    ? data?.map(transaction => ({
        date: transaction.date,
        value: transaction.amount
      }))
    : [];

  return (
    <div className="w-full h-[250px] mt-2">
      {isLoading && (
        <div
          className="h-full w-full rounded animate-pulse bg-[#56616B30]"
          role="alert"
        ></div>
      )}
      {!isLoading && (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FF5403"
                strokeWidth={1}
                dot={false}
              />
              <XAxis
                dataKey="date"
                interval="preserveStartEnd"
                tickFormatter={(value, index) => {
                  if (index === 0 || index === graphData?.length - 1) {
                    return `${moment(value).format("MMM D, YYYY")}`;
                  }
                  return "";
                }}
                tick={{ fill: "#56616B", fontSize: 14 }}
                axisLine={{ stroke: "#DBDEE5", strokeWidth: 1 }}
                tickLine={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default TransactionsGraph;
