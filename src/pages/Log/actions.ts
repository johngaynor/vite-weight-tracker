import { toast } from "react-toastify";
import { LogFormFields } from "../types";
import { formatDate } from "../../components/HelperFunctions/HelperFunctions";
import supabase from "../../config/SupabaseConfig";

export const saveLog = async (
  formFields: LogFormFields,
  user: any,
  date: Date,
  setSaveLogLoading: Function,
  setRefreshLog: Function
) => {
  setSaveLogLoading(true);
  try {
    const { morningWeight, morningNotes, nightWeight, nightNotes } = formFields;

    if ((morningWeight as number) > 700 || (nightWeight as number) > 700) {
      throw new Error("The weight you entered is not physically possible...");
    }

    if (!user) throw new Error("Please sign in before saving your log.");

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
      throw new Error(error.message);
    }
    setRefreshLog(true);
    toast.success("Successfully updated log!");
  } catch (error: any) {
    toast.error("Error: " + error.message);
  }
  setSaveLogLoading(false);
};

export const getLog = async (
  session: any,
  setLog: Function,
  setLogLoading: Function,
  setRecentEntry: Function,
  user: any
) => {
  setLogLoading(true);
  try {
    const userId = session ? session.user.id : user.id;
    const { data, error } = await supabase
      .from("user_log")
      .select()
      .eq("id", userId);
    if (error) {
      throw new Error(error.message);
    }
    setLog(data);
    if (data.length) {
      const sortedData = [...data].sort((a: any, b: any) =>
        b.day.localeCompare(a.day)
      );
      setRecentEntry(sortedData[0]);
    }
  } catch (error: any) {
    toast.error("Error: " + error.message);
  }

  setLogLoading(false);
};
