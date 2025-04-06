import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlState = () => {
  const [param, setParam] = useSearchParams();
  const [batchChanges, setBatchChanges] = useState<null | typeof param>(null);

  useEffect(() => {
    if (batchChanges) {
      setParam(prev => {
        Array.from(batchChanges?.entries() ?? []).forEach(([k, v]) => {
          prev.set(k, v);
        });
        return prev;
      });
      setBatchChanges(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchChanges]);

  const value = (name: string, defaultValue?: string) =>
    param.get(name) || defaultValue || "";

  const valueArr = (name: string) => param.getAll(name) ?? [];
  const setToBatch = (name: string, value: string | string[]) => {
    setBatchChanges(prev => {
      const newState = new URLSearchParams(prev ?? {});
      if (Array.isArray(value)) {
        newState.delete(name);
        value.forEach(v => newState.append(name, v));
      } else {
        newState.set(name, value);
      }
      return newState;
    });
  };
  const onChange =
    (name: string) =>
    (
      value: string | string[],
      clearAll?: boolean | { only?: string[]; except?: string[] }
    ) => {
      if (typeof clearAll === "object" && clearAll.except) {
        const exceptions: Record<string, string | string[]> = {};
        clearAll.except.forEach(key => {
          if (param.get(key)) exceptions[key] = param.getAll(key);
        });
        setParam({
          ...exceptions,
          [name]: value
        });
      } else if (typeof clearAll === "object" && clearAll.only) {
        clearAll.only.forEach(key => {
          clearQueryParam(key);
        });
        setToBatch(name, value);
      } else if (clearAll) {
        setParam({
          [name]: value
        });
        setBatchChanges(null);
      } else {
        setToBatch(name, value);
      }
    };
  const input = (name: string, defaultValue?: string) => ({
    value: value(name, defaultValue),
    onChange: onChange(name)
  });
  const clearQueryParam = (name: string) => {
    const parameter = param.get(name);
    if (parameter) {
      param.delete(name);
      setParam(param);
    }
  };
  const clearMultipleQueryParam = (names: string[]) => {
    names.forEach(name => {
      const parameter = param.get(name);
      if (parameter) {
        param.delete(name);
      }
    });
    setParam(param);
  };

  return {
    input,
    value,
    valueArr,
    clearQueryParam,
    clearMultipleQueryParam,
    onChange,
    changeMultiple: (args: Record<string, string | string[]>) => {
      Object.entries(args).forEach(([key, value]) => {
        onChange(key)(value);
      });
    }
  };
};
