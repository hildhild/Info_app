import { useEffect, useState } from "react";

//trì hoãn việc cập nhật một giá trị nào đó cho đến khi người dùng dừng tương tác trong một khoảng thời gian nhất định
export default function useDebounce(value, delay) { 
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // hủy bỏ timeout nếu value hoặc delay thay đổi trước khi timeout hoàn tất. 
      // đảm bảo rằng debouncedValue chỉ được cập nhật sau khi người dùng dừng thay đổi value trong khoảng thời gian delay.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Neu value hoặc delay thay doi thi phải chờ tiếp 1 khoảng tgian delay
  );

  return debouncedValue;
}
