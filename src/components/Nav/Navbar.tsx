import { forwardRef, ReactNode, Ref } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { SunIcon, MoonIcon, HomeIcon } from "@radix-ui/react-icons";
import { CaretDownIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { logout } from "../../pages/Auth/actions";
import {
  useDarkMode,
  useChangeMode,
  useUser,
  useSetUser,
} from "../../store/AppStore";
import { useSetLogoutLoading } from "../../store/LoadingStore";
import "./Navbar.css";

interface ListItemProps {
  className?: string;
  children?: ReactNode;
  title: string;
  to?: string;
}

const Navbar = () => {
  const darkMode = useDarkMode();
  const changeMode = useChangeMode();
  const user = useUser();
  const setUser = useSetUser();
  const navigate = useNavigate();
  const setLogoutLoading = useSetLogoutLoading();
  const ListItem = forwardRef(
    (
      { className, children, title, to }: ListItemProps,
      forwardedRef: Ref<HTMLAnchorElement>
    ) => (
      <li>
        <Link
          className={classNames("ListItemLink", className)}
          to={to || "#"} // Default to "#" if 'to' is not provided
          ref={forwardedRef}
          target={to ? "_blank" : "_self"} // Open link in a new tab only if 'to' is provided
        >
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </Link>
      </li>
    )
  );

  const handleLogout = async () => {
    await logout(setUser, navigate, setLogoutLoading);
  };

  return (
    <>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          {/* home button */}
          <NavigationMenu.Item>
            <Link className="NavigationMenuLink" to="/">
              <HomeIcon />
            </Link>
          </NavigationMenu.Item>
          {/* tech stack dropdown */}
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Stack <CaretDownIcon className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent">
              <ul className="List two">
                <ListItem title="React + Vite" to="https://vitejs.dev/guide/">
                  React app initialized and developed with Vite.
                </ListItem>
                <ListItem
                  title="Zustand"
                  to="https://docs.pmnd.rs/zustand/getting-started/introduction"
                >
                  Minimal, unopinonated state management library.
                </ListItem>
                <ListItem
                  title="TypeScript"
                  to="https://www.typescriptlang.org/docs/"
                >
                  Experimentation with interfaces and type safety.
                </ListItem>
                <ListItem title="Radix UI" to="https://www.radix-ui.com">
                  Minimalistic design system with components and themes.
                </ListItem>
                <ListItem title="Supabase" to="https://supabase.com/docs">
                  Open source platform with services for data and
                  authentication.
                </ListItem>
                <ListItem
                  title="React Query"
                  to="https://tanstack.com/query/latest"
                >
                  Async state management, complete with loading and error
                  states.
                </ListItem>
              </ul>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          {/* github link */}
          <NavigationMenu.Item>
            <Link
              className="NavigationMenuLink"
              to="https://github.com/johngaynor/vite-weight-tracker"
              target="_blank"
            >
              Github
            </Link>
          </NavigationMenu.Item>
          {/* Auth */}
          {user ? (
            <NavigationMenu.Item>
              <div className="NavigationMenuLink" onClick={handleLogout}>
                Logout
              </div>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item>
              <Link className="NavigationMenuLink" to="/auth">
                Login
              </Link>
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
