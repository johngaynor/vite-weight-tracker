import { Theme } from "@radix-ui/themes";
import { Flex, Container } from "@radix-ui/themes";
import Navbar from "../components/Nav/Navbar";
import { useDarkMode, useUser, useSetUser } from "../store/AppStore";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import supabase from "../config/SupabaseConfig";

const Root = () => {
  const darkMode = useDarkMode();
  const user = useUser();
  const setUser = useSetUser();
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("ROOT", event, session);

    if (event === "INITIAL_SESSION") {
      // handle initial session
    } else if (event === "SIGNED_IN") {
      if (!user && session?.user) {
        setUser(session.user);
      }
      // handle sign in event
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
    } else if (event === "PASSWORD_RECOVERY") {
      // handle password recovery event
    } else if (event === "TOKEN_REFRESHED") {
      // handle token refreshed event
    } else if (event === "USER_UPDATED") {
      // handle user updated event
    }
  });

  data.subscription.unsubscribe;

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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />
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
