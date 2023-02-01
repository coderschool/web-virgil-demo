import useLocalStorageState from "./useLocalStorageState";

function useCounter(key, initialValue = 0) {
  const [count, setCount] = useLocalStorageState(key, initialValue);

  const increment = () => {
    setCount((count) => count + 1);
  };
  const decrement = () => {
    setCount((count) => count - 1);
  };

  return [count, increment, decrement];
}

export default useCounter;
