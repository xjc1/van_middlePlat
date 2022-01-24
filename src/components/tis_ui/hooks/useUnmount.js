import { useEffect, useRef } from 'react';

function useUnmount() {
  const isUnmount = useRef(false);

  useEffect(() => {
    return () => {
      isUnmount.current = true;
    };
  }, []);

  return [
    fn => (...params) => {
      if (!isUnmount.current) {
        fn(...params);
      }
    },
  ];
}

export default useUnmount;
