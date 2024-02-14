import reactLogo from "../../assets/images/react.svg";
import viteLogo from "/vite.svg";
import { useCount, useIncrCount, useDecrCount } from "../../store/TodoStore";
import { Flex, Text, Button, Box } from "@radix-ui/themes";

function Home() {
  const count = useCount();
  const incrCount = useIncrCount();
  const decrCount = useDecrCount();

  return (
    <Flex direction="column" align="center" justify="center" gap="3">
      <Box>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Box>
      <Text>Vite + React</Text>
      <div className="card">
        <Button onClick={() => decrCount(2)}>-</Button>
        <Button>count is {count}</Button>
        <Button onClick={() => incrCount(1)}>+</Button>
      </div>
    </Flex>
  );
}

export default Home;
