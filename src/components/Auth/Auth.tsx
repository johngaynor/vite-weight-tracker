// import React from 'react';
import * as Tabs from "@radix-ui/react-tabs";
import "./Auth.css";

const Auth = () => {
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
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="login-password">
            Password
          </label>
          <input
            className="Input"
            id="login-password"
            placeholder="verySecurePassword"
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <button className="Button green">Login</button>
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
          <input className="Input" id="register-email" type="email" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="register-password">
            Password
          </label>
          <input className="Input" id="register-password" type="password" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="register-confirm-password">
            Confirm password
          </label>
          <input
            className="Input"
            id="register-confirm-password"
            type="password"
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <button className="Button green">Register</button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Auth;
