import { toast } from "react-toastify";
import { FormFields } from "./types";
import { formatDate } from "../components/HelperFunctions/HelperFunctions";
import supabase from "../config/SupabaseConfig";

export const saveLog = async (
  formFields: FormFields,
  user: any,
  date: Date
) => {
  const { morningWeight, morningNotes, nightWeight, nightNotes } = formFields;

  if ((morningWeight as number) > 700 || (nightWeight as number) > 700) {
    toast.error("The weight you entered is not physically possible...");
    return;
  }

  const { error } = await supabase.from("user_log").upsert({
    id: user.id,
    day: formatDate(date),
    morning_weight: morningWeight,
    morning_notes: morningNotes,
    night_weight: nightWeight,
    night_notes: nightNotes,
  });

  if (error) {
    toast.error("Error updating log: " + error.message);
  } else {
    toast.success("Successfully updated log!");
  }
};
