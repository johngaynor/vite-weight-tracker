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
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formFields.loginEmail,
      password: formFields.loginPassword,
    });

    if (error) {
      throw new Error(error.message);
    }
    toast.success("Successfully logged in!");
    setFormFields({
      loginEmail: "",
      loginPassword: "",
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    });
    navigate("/");
  } catch (error: any) {
    toast.error("Error: " + error.message);
  }
  setLoginLoading(false);
};

export const register = async (
  formFields: AuthFormFields,
  setFormFields: Function,
  navigate: Function,
  setRegisterLoading: Function
) => {
  setRegisterLoading(true);
  try {
    if (formFields.registerPassword !== formFields.registerConfirmPassword) {
      throw new Error("Passwords do not match.");
    }

    if (formFields.registerPassword.length < 6) {
      throw new Error("Password needs to be at least 6 characters long.");
    }

    const { error, data } = await supabase.auth.signUp({
      email: formFields.registerEmail,
      password: formFields.registerPassword,
      options: {
        emailRedirectTo: "localhost:5173",
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user?.identities?.length) {
      throw new Error("This email address is already in use.");
    }

    toast.success(
      "Successfully created an account! Please check your email to verify and login."
    );
    setFormFields((prev: any) => ({
      ...prev,
      registerEmail: "",
      registerPassword: "",
      registerConfirmPassword: "",
    }));
    navigate("/");
  } catch (error: any) {
    toast.error("Error: " + error.message);
    setFormFields((prev: any) => ({
      ...prev,
      registerPassword: "",
      registerConfirmPassword: "",
    }));
  }
  setRegisterLoading(false);
};

export const logout = async (
  setUser: Function,
  navigate: Function,
  setLogoutLoading: Function
) => {
  setLogoutLoading(true);
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    toast.success("You have successfully logged out. See you later :)");
    setUser(null);
    navigate("/auth");
  } catch (error: any) {
    toast.error("Error: " + error.message);
  }
  setLogoutLoading(false);
};
