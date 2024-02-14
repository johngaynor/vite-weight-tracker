import supabase from "../../config/SupabaseConfig";
import { AuthFormFields } from "../types";
import { toast } from "react-toastify";

export const login = async (
  formFields: AuthFormFields,
  setFormFields: Function,
  navigate: Function
) => {
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
};

export const register = async (
  formFields: AuthFormFields,
  setFormFields: Function,
  navigate: Function
) => {
  if (formFields.registerPassword !== formFields.registerConfirmPassword) {
    toast.error("Please make sure passwords match before creating an account.");
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
};
