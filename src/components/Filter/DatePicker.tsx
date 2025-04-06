import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "../../utils/helpers.utils";
import moment from "moment";

interface CustomInputProps {
  onClick?: () => void;
  className?: string;
  value: string;
}

const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>(
  ({ onClick, className, value }, ref) => (
    <button
      type="button"
      className={cn(
        "border border-[#EFF1F6] h-12 rounded-[12px] flex items-center justify-between bg-[#EFF1F6] px-4",
        className
      )}
      ref={ref}
      onClick={onClick}
    >
      <span className="text-sm font-medium">
        {moment(value).format("D MMM, YYYY")}
      </span>

      <img src="/icons/expand.svg" alt="expand" />
    </button>
  )
);

const CustomDatePicker = ({
  value,
  onChange
}: {
  value: string;
  onChange: (date: string) => void;
}) => {
  return (
    <div className="">
      <DatePicker
        wrapperClassName="w-full"
        selected={value as unknown as Date}
        onChange={date => onChange(String(date))}
        customInput={<CustomInput className="w-full" value={value} />}
      />
    </div>
  );
};

export default CustomDatePicker;
