import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 2000);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return { debouncedValue };
};

export default useDebounce;
