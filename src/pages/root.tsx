import { useState } from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Container } from "@radix-ui/themes";
import Navbar from "../components/Nav/Navbar";
import { useDarkMode, useUser, useSetUser } from "../store/AppStore";
import { useLog, useSetLog, useSetRecentEntry } from "../store/LogStore";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import supabase from "../config/SupabaseConfig";
import Spinner from "../components/Spinner/Spinner";
import {
  useLogLoading,
  useSetLogLoading,
  useSaveLogLoading,
} from "../store/LoadingStore";
import { getLog } from "./Log/actions";

const Root = () => {
  const [initialLoad, setInitialLoad] = useState<boolean>(false);
  const darkMode = useDarkMode();
  const user = useUser();
  const setUser = useSetUser();
  const log = useLog();
  const setLog = useSetLog();
  const setRecentEntry = useSetRecentEntry();
  const logLoading = useLogLoading();
  const setLogLoading = useSetLogLoading();
  const saveLogLoading = useSaveLogLoading();

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    // console.log("ROOT", event, session);

    if (event === "INITIAL_SESSION") {
      // handle initial session
      if (!initialLoad) setInitialLoad(true);
    } else if (event === "SIGNED_IN") {
      // handle sign in event (fires a lot, i.e. when switching tabs)
      if (session?.user && (!user || user.id !== session.user.id)) {
        setUser(session.user);
        if (!log) getLog(session, setLog, setLogLoading, setRecentEntry);
      }
    } else if (event === "SIGNED_OUT") {
      // handle sign out event
      setLog(null);
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
            style={{ height: "90vh" }}
          >
            {!initialLoad || logLoading || saveLogLoading ? (
              <Spinner />
            ) : (
              <Outlet />
            )}
          </Flex>
        </Container>
      </Theme>
    </>
  );
};

export default Root;
