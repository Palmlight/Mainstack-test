import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface IDropdownProps {
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  placeholder?: string;
  label: string;
}

export default function MultiSelectDropdown({
  options,
  selectedOptions = [],
  setSelectedOptions,
  placeholder,
  label
}: IDropdownProps) {
  const toggleOption = (value: string) => {
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter(item => item !== value)
        : [...selectedOptions, value]
    );
  };

  return (
    <div className="w-full space-y-3 group">
      <label className="text-sm font-semibold">{label}</label>

      <Listbox value={selectedOptions} multiple>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl border px-4 py-3 text-left bg-[#EFF1F6] border-[#EFF1F6] group-focus-within:border-3 group-focus-within:border-[#131316] group-focus-within:bg-white">
            <span className="block truncate text-black">
              {selectedOptions.join(", ") || placeholder || "Select types"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <img src="/icons/expand.svg" alt="" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-xl bg-white p-2 text-sm dropdown-shadow focus:outline-none">
              {options.map(option => (
                <Listbox.Option
                  key={option}
                  value={option}
                  className={({ active }) =>
                    `relative flex cursor-pointer items-center rounded-lg px-[14px] h-12 ${
                      active ? "bg-gray-100" : ""
                    }`
                  }
                  onClick={() => toggleOption(option)}
                >
                  <>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option)}
                      className="mr-2.5 h-4 w-4 rounded border-gray-300 text-black focus:ring-0 accent-[#1C1B1F]"
                    />
                    <span className="block text-black font-semibold">
                      {option}
                    </span>
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
