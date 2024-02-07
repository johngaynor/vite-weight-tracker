import reactLogo from "./assets/images/react.svg";
import viteLogo from "/vite.svg";
import { useDarkMode, useChangeMode } from "./store/AppStore";
import { useCount, useIncrCount, useDecrCount } from "./store/TodoStore";
import { Flex, Text, Button, Box, Container } from "@radix-ui/themes";
import Navbar from "./components/Nav/Navbar";
import { Theme, ThemePanel } from "@radix-ui/themes";

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
    <Theme
      accentColor="iris"
      grayColor="sand"
      panelBackground="solid"
      radius="large"
      scaling="95%"
    >
      <Container>
        <Navbar />
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ height: "98vh" }}
        >
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
            <div className="card">
              <Button onClick={() => changeMode()}>Change Mode</Button>
            </div>
          </Flex>
        </Flex>
      </Container>
    </Theme>
  );
}

export default App;
