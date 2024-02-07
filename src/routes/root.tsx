import { Theme } from "@radix-ui/themes";
import { Flex, Container } from "@radix-ui/themes";
import Navbar from "../components/Nav/Navbar";
import { useDarkMode } from "../store/AppStore";
import { Outlet } from "react-router-dom";

const Root = () => {
  const darkMode = useDarkMode();

  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  return (
    <>
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
            style={{ height: "97vh" }}
          >
            <Outlet />
          </Flex>
        </Container>
      </Theme>
    </>
  );
};

export default Root;
