import moment from "moment";
import { useUrlState } from "../../hooks/useUrlState";
import SideModal from "../SideModal";
import { FormikProvider, useFormik } from "formik";
import CustomDatePicker from "./DatePicker";
import MultiSelectDropdown from "./DropDown";
import { useState } from "react";
import Button from "../Button/Button";

const FilterDrawer = () => {
  const { clearQueryParam, value, changeMultiple, clearMultipleQueryParam } =
    useUrlState();
  const showFilter = !!value("filter");
  const [transactionTypes, setTransactionTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);

  const handleClose = () => {
    clearQueryParam("filter");
  };

  const quickDateRanges = [
    {
      label: "Today",
      range: {
        startDate: moment().startOf("day").toISOString(),
        endDate: moment().endOf("day").toISOString()
      }
    },
    {
      label: "Last 7 Days",
      range: {
        startDate: moment().subtract(7, "days").startOf("day").toISOString(),
        endDate: moment().endOf("day").toISOString()
      }
    },
    {
      label: "This Month",
      range: {
        startDate: moment().startOf("month").toISOString(),
        endDate: moment().endOf("month").toISOString()
      }
    },
    {
      label: "Last 3 months",
      range: {
        startDate: moment()
          .subtract(3, "months")
          .startOf("month")
          .toISOString(),
        endDate: moment().endOf("month").toISOString()
      }
    }
  ];

  const form = useFormik({
    initialValues: {
      startDate: value("startDate", new Date().toISOString()),
      endDate: value("endDate", new Date().toISOString()),
      types: value("type", "")
    },
    onSubmit: values => {
      changeMultiple({
        startDate: values.startDate,
        endDate: values.endDate,
        status: statuses,
        types: transactionTypes
      });
      handleClose();
    }
  });

  const clearOptions = () => {
    setTransactionTypes([]);
    setStatuses([]);
    clearMultipleQueryParam(["startDate", "endDate", "status", "types"]);
    handleClose();
  };

  return (
    <SideModal
      className="w-[500px] mr-[10px] flex flex-col h-full "
      show={showFilter}
      onClose={handleClose}
    >
      <FormikProvider value={form}>
        <form
          action=""
          onSubmit={form.handleSubmit}
          className="h-full bg-white shadow-xl my-[15px] px-6 rounded-[20px] pb-5"
        >
          <section className="w-full h-full flex flex-col ">
            <header className="py-5 px-6 flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Filter</h1>

              <button onClick={handleClose} type="button">
                <img src="/icons/close.svg" alt="" />
              </button>
            </header>

            <div className="flex items-center justify-between">
              {quickDateRanges.map(item => (
                <button
                  key={item?.label}
                  type="button"
                  className="border border-[#EFF1F6] rounded-full py-2.5 px-[18px] text-sm font-semibold text-[#131316]"
                  onClick={() => {
                    form.setFieldValue("startDate", item?.range?.startDate);
                    form.setFieldValue("endDate", item?.range?.endDate);
                  }}
                >
                  {item?.label}
                </button>
              ))}
            </div>
            <div className="mt-5">
              <h3 className="mb-3 font-semibold text-[#131316]">Date Range</h3>
              <div className="grid grid-cols-2 gap-1.5">
                <CustomDatePicker
                  value={form.values.startDate}
                  onChange={d => form.setFieldValue("startDate", d)}
                />
                <CustomDatePicker
                  value={form.values.endDate}
                  onChange={d => form.setFieldValue("endDate", d)}
                />
              </div>
            </div>

            <section className="mt-6 space-y-6">
              <MultiSelectDropdown
                label="Transaction Type"
                options={[
                  "Store Transactions",
                  "Get Tipped",
                  "Withdrawals",
                  "Chargebacks",
                  "Cashbacks",
                  "Refer & Earn"
                ]}
                selectedOptions={transactionTypes}
                setSelectedOptions={options => setTransactionTypes(options)}
              />

              <MultiSelectDropdown
                label="Transaction Status"
                options={["Successful", "Pending", "Failed"]}
                selectedOptions={statuses}
                setSelectedOptions={options => setStatuses(options)}
                placeholder="Select status"
              />
            </section>

            <div className="mt-auto flex items-center justify-between gap-3">
              <Button
                className="h-12"
                variant="tertiary"
                onClick={clearOptions}
              >
                Clear
              </Button>
              <Button className="h-12" type="submit">
                Apply
              </Button>
            </div>
          </section>
        </form>
      </FormikProvider>
    </SideModal>
  );
};

export default FilterDrawer;
