import supabase from "../../config/SupabaseConfig";
import { AuthFormFields } from "../types";
import { toast } from "react-toastify";

export const login = async (
  formFields: AuthFormFields,
  setFormFields: Function,
  navigate: Function,
  setLoginLoading: Function
) => {
  setLoginLoading(true);
  const { error } = await supabase.auth.signInWithPassword({
    email: formFields.loginEmail,
    password: formFields.loginPassword,
  });

  if (error) {
    toast.error("Error logging in: " + error.message);
    setFormFields((prev: any) => ({
      ...prev,
      loginPassword: "",
    }));
  } else {
    toast.success("Successfully logged in!");
    setFormFields({
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    });
    navigate("/");
  }
  setLoginLoading(false);
};

export const register = async (
  formFields: AuthFormFields,
  setFormFields: Function,
  navigate: Function,
  setRegisterLoading: Function
) => {
  if (formFields.registerPassword !== formFields.registerConfirmPassword) {
    toast.error("Please make sure passwords match before creating an account.");
    return;
  }

  setRegisterLoading(true);
  const { error } = await supabase.auth.signUp({
    email: formFields.registerEmail,
    password: formFields.registerPassword,
    options: {
      emailRedirectTo: "localhost:5173",
    },
  });

  if (error) {
    toast.error("Error creating account: " + error.message);
    setFormFields((prev: any) => ({
      ...prev,
      registerPassword: "",
      registerConfirmPassword: "",
    }));
  } else {
    toast.success("Successfully created an account!");
    setFormFields((prev: any) => ({
      ...prev,
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    }));
    navigate("/");
  }
  setRegisterLoading(false);
};

export const logout = async (
  setUser: Function,
  navigate: Function,
  setLogoutLoading: Function
) => {
  setLogoutLoading(true);
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Error signing out: " + error.message);
  } else {
    toast.success("You have successfully logged out. See you later :)");
    setUser(null);
    navigate("/auth");
  }
  setLogoutLoading(false);
};
