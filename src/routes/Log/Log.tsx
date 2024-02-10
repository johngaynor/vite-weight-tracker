import React, { useCallback, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { toast } from "react-toastify";
import supabase from "../../config/SupabaseConfig";
// import { useNavigate } from "react-router-dom";
import "./Log.css";

type FormFields = {
  morningWeight: number | null;
  morningNotes: string;
  nightWeight: number | null;
  nightNotes: string;
  // nightCalories: number;
};

const Log = () => {
  const [formFields, setFormFields] = useState<FormFields>({
    morningWeight: null,
    morningNotes: "",
    nightWeight: null,
    nightNotes: "",
    // nightCalories: 0,
  });
  // const navigate = useNavigate();

  const handleSaveMorning = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(formFields);
    },
    [formFields]
  );

  const handleSaveNight = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(formFields);
    },
    [formFields]
  );

  const validateWeight = (
    e: React.ChangeEvent<HTMLInputElement>,
    b: "morning" | "night"
  ) => {
    const regex = /^\d*\.?\d{0,1}$/;
    const newValue = e.target.value;

    if (regex.test(newValue) || newValue === "" || newValue === "-") {
      const type = b + "Weight";
      setFormFields((prev) => ({
        ...prev,
        [type]: newValue === "" ? null : parseFloat(newValue),
      }));
    }
  };

  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          Morning
        </Tabs.Trigger>
        <Tabs.Trigger className="TabsTrigger" value="tab2">
          Night
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="TabsContent" value="tab1">
        <p className="Text">
          Good morning! Enter your dry weight (after using the bathroom) and any
          comments.
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="morning-weight">
            Morning Weight
          </label>
          <input
            className="Input"
            id="morning-weight"
            placeholder="180.2"
            type="number"
            value={formFields.morningWeight ?? ""}
            onChange={(e) => validateWeight(e, "morning")}
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="morning-notes">
            Notes
          </label>
          <textarea
            className="Textarea"
            id="morning-notes"
            placeholder="..."
            value={formFields.morningNotes}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                morningNotes: e.target.value,
              }))
            }
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <form onSubmit={handleSaveMorning}>
            <button className="Button green">Save</button>
          </form>
        </div>
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <p className="Text">
          We hope you had a good day! Enter your night time weight and any
          comments.
        </p>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="night-weight">
            Night Weight
          </label>
          <input
            className="Input"
            id="night-weight"
            placeholder="180.2" // load in dynamically based on previous day
            type="number"
            value={formFields.nightWeight ?? ""}
            onChange={(e) => validateWeight(e, "night")}
          />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="night-notes">
            Notes
          </label>
          <textarea
            className="Textarea"
            id="night-notes"
            placeholder="..."
            value={formFields.nightNotes}
            onChange={(e) =>
              setFormFields((prev) => ({
                ...prev,
                nightNotes: e.target.value,
              }))
            }
          />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
        >
          <form onSubmit={handleSaveNight}>
            <button className="Button green">Save</button>
          </form>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default Log;
