import React, { useCallback, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { toast } from "react-toastify";
import supabase from "../../config/SupabaseConfig";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

type FormFields = {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
};

const Auth = () => {
  const [formFields, setFormFields] = useState<FormFields>({
    loginEmail: "",
    loginPassword: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirmPassword: "",
  });
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { error } = await supabase.auth.signInWithPassword({
        email: formFields.loginEmail,
        password: formFields.loginPassword,
      });

      if (error) {
        toast.error("Error logging in: " + error.message);
        setFormFields((prev) => ({
          ...prev,
          loginPassword: "",
        }));
      } else {
        toast.success("Successfully logged in!");
        setFormFields((prev) => ({
          ...prev,
          loginEmail: "",
          loginPassword: "",
        }));
        navigate("/");
      }
    },
    [formFields]
  );

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (formFields.registerPassword !== formFields.registerConfirmPassword) {
        toast.error(
          "Please make sure passwords match before creating an account."
        );
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: formFields.registerEmail,
        password: formFields.registerPassword,
        options: {
          emailRedirectTo: "localhost:5173",
        },
      });

      if (error) {
        toast.error("Error creating account: " + error.message);
        setFormFields((prev) => ({
          ...prev,
          registerPassword: "",
          registerConfirmPassword: "",
        }));
      } else {
        toast.success("Successfully created an account!");
        setFormFields((prev) => ({
          ...prev,
          registerEmail: "",
          registerPassword: "",
          registerConfirmPassword: "",
        }));
        navigate("/");
      }
    },
    [formFields]
  );

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          Login
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          Register
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <p className="Text">
          Welcome back! Enter your email and password to continue.
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="login-email">
            Email
          </label>
          <input
            className="Input"
            id="login-email"
            placeholder="your@email.com"
            value={formFields.loginEmail}
            onChange={(e) =>
              setFormFields((prev) => ({ ...prev, loginEmail: e.target.value }))
            }
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="login-password">
            Password
          </label>
          <input
            className="Input"
            id="login-password"
            type="password"
            placeholder="123456"
            value={formFields.loginPassword}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                loginPassword: e.target.value,
              }))
            }
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <form onSubmit={handleLogin}>
            <button className="Button green">Login</button>
          </form>
        </div>
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <p className="Text">
          Enter your email and password to create an account!
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="register-email">
            Email
          </label>

          <input
            className="Input"
            id="register-email"
            type="email"
            placeholder="your@email.com"
            value={formFields.registerEmail}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                registerEmail: e.target.value,
              }))
            }
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="register-password">
            Password
          </label>
          <input
            className="Input"
            id="register-password"
            type="password"
            placeholder="123456"
            value={formFields.registerPassword}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                registerPassword: e.target.value,
              }))
            }
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="register-confirm-password">
            Confirm password
          </label>
          <input
            className="Input"
            id="register-confirm-password"
            type="password"
            placeholder="123456"
            value={formFields.registerConfirmPassword}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                registerConfirmPassword: e.target.value,
              }))
            }
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <form onSubmit={handleRegister}>
            <button className="Button green">Register</button>
          </form>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Auth;
