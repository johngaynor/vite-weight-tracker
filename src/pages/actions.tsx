import { toast } from "react-toastify";
import { FormFields } from "./types";
import { formatDate } from "../components/HelperFunctions/HelperFunctions";
import supabase from "../config/SupabaseConfig";

export const saveLog = async (
  formFields: FormFields,
  user: any,
  date: Date,
  setSaveLogLoading: Function
) => {
  const { morningWeight, morningNotes, nightWeight, nightNotes } = formFields;

  if ((morningWeight as number) > 700 || (nightWeight as number) > 700) {
    toast.error("The weight you entered is not physically possible...");
    return;
  }

  setSaveLogLoading(true);
  // I want to have something here to indicate that it was in an edit mode, and now it's saved.... something to show that the value is changed and needs to be saved?

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

  setSaveLogLoading(false);
};

export const getLog = async (
  session: any,
  setLog: Function,
  setLogLoading: Function,
  setRecentEntry: Function
) => {
  setLogLoading(true);
  const { data, error } = await supabase
    .from("user_log")
    .select()
    .eq("id", session.user.id);
  if (error) {
    toast.error("Error retrieving log: " + error.message);
  } else {
    setLog(data);
    if (data.length) {
      const sortedData = [...data].sort((a: any, b: any) =>
        b.day.localeCompare(a.day)
      );
      setRecentEntry(sortedData[0]);
    }
  }
  setLogLoading(false);
};
