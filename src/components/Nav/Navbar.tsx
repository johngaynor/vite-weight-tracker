import { forwardRef, ReactNode, Ref } from "react";
import { useNavigate } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SunIcon, MoonIcon, HomeIcon } from "@radix-ui/react-icons";
import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import supabase from "../../config/SupabaseConfig";

import {
  useDarkMode,
  useChangeMode,
  useUser,
  useSetUser,
} from "../../store/AppStore";
import "./Navbar.css";
import { toast } from "react-toastify";

interface ListItemProps {
  className?: string;
  children?: ReactNode;
  title: string;
  href?: string;
}

const Navbar = () => {
  const darkMode = useDarkMode();
  const changeMode = useChangeMode();
  const user = useUser();
  const setUser = useSetUser();
  const navigate = useNavigate();
  const ListItem = forwardRef(
    (
      { className, children, title, ...props }: ListItemProps,
      forwardedRef: Ref<HTMLAnchorElement>
    ) => (
      <li>
        <NavigationMenu.Link asChild>
          <a
            className={classNames("ListItemLink", className)}
            {...props}
            ref={forwardedRef}
            target="_blank"
          >
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </a>
        </NavigationMenu.Link>
      </li>
    )
  );

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out: " + error.message);
    } else {
      toast.success("You have successfully logged out. See you later :)");
      setUser(null);
      navigate("/");
    }
  };

  return (
    <>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          {/* home button */}
          <NavigationMenu.Item>
            <NavigationMenu.Link className="NavigationMenuLink" href="/">
              <HomeIcon />
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* tech stack dropdown */}
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Stack <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <ListItem title="React + Vite" href="https://vitejs.dev/guide/">
                  React app initialized and developed with Vite.
                </ListItem>
                <ListItem
                  title="Zustand"
                  href="https://docs.pmnd.rs/zustand/getting-started/introduction"
                >
                  Minimal, unopinonated state management library.
                </ListItem>
                <ListItem
                  title="TypeScript"
                  href="https://www.typescriptlang.org/docs/"
                >
                  Experimentation with interfaces and type safety.
                </ListItem>
                <ListItem title="Radix UI" href="https://www.radix-ui.com">
                  Minimalistic design system with components and themes.
                </ListItem>
                <ListItem title="Supabase" href="https://supabase.com/docs">
                  Open source platform with services for data and
                  authentication.
                </ListItem>
                <ListItem
                  title="React Query"
                  href="https://tanstack.com/query/latest"
                >
                  Async state management, complete with loading and error
                  states.
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          {/* github link */}
          <NavigationMenu.Item>
            <NavigationMenu.Link
              className="NavigationMenuLink"
              href="https://github.com/johngaynor/vite-weight-tracker"
            >
              Github
            </NavigationMenu.Link>
          </NavigationMenu.Item>
          {/* Auth */}
          {user ? (
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                onClick={handleLogout}
              >
                Logout
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item>
              <NavigationMenu.Link className="NavigationMenuLink" href="/auth">
                Login
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          )}

          {/* change light mode */}
          <NavigationMenu.Item onClick={() => changeMode()}>
            <NavigationMenu.Link className="NavigationMenuLink">
              {darkMode ? <MoonIcon /> : <SunIcon />}
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.Indicator className="NavigationMenuIndicator">
            <div className="Arrow" />
          </NavigationMenu.Indicator>
        </NavigationMenu.List>
        <div className="ViewportPosition">
          <NavigationMenu.Viewport
            className="NavigationMenuViewport"
            style={{ backgroundColor: darkMode ? "#111110" : "white" }}
          />
        </div>
      </NavigationMenu.Root>
    </>
  );
};

export default Navbar;
