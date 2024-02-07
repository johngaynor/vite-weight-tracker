import reactLogo from "./assets/images/react.svg";
import viteLogo from "/vite.svg";
import {
  useCount,
  useIncrCount,
  useDecrCount,
  useDarkMode,
  useChangeMode,
} from "./store";
import { Flex, Text, Button } from "@radix-ui/themes";

function App() {
  const count = useCount();
  const incrCount = useIncrCount();
  const decrCount = useDecrCount();
  const darkMode = useDarkMode();
  const changeMode = useChangeMode();

  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  return (
    <Flex direction="column" gap="2">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Text>Vite + React</Text>
      <div className="card">
        <Button onClick={() => decrCount(2)}>-</Button>
        <Button>count is {count}</Button>
        <Button onClick={() => incrCount(1)}>+</Button>
      </div>
      <div className="card">
        <Button onClick={() => changeMode()}>Change Mode</Button>
      </div>
    </Flex>
  );
}

export default App;
