import React, { useCallback, useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import DatePicker from "react-datepicker";
import { useDarkMode, useUser } from "../../store/AppStore";
import { useLog, useRecentEntry } from "../../store/LogStore";
import "./Log.css";
import "react-datepicker/dist/react-datepicker.css";
import { FormFields } from "../types";
import { formatDate } from "../../components/HelperFunctions/HelperFunctions";
import { saveLog } from "../actions";

const defaultFormFields = {
  morningWeight: null,
  morningNotes: "",
  nightWeight: null,
  nightNotes: "",
};

const Log = () => {
  const [formFields, setFormFields] = useState<FormFields>({
    ...defaultFormFields,
  });
  const [date, setDate] = useState(new Date());
  const darkMode = useDarkMode();
  const user = useUser();
  const log = useLog();
  const recentEntry = useRecentEntry();

  const handleSaveLog = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await saveLog(formFields, user, date);
    },
    [formFields, date]
  );

  // useEffect to find match and log
  useEffect(() => {
    if (log) {
      const formattedDate = formatDate(date);
      const match = log.find((l) => l.day === formattedDate);
      if (match) {
        setFormFields((prev) => ({
          ...prev,
          morningWeight: match.morning_weight,
          nightWeight: match.night_weight,
          morningNotes: match.morning_notes || "",
          nightNotes: match.night_notes || "",
        }));
      } else {
        setFormFields(defaultFormFields);
      }
    }
  }, [date, log]);

  const handleBlur = (type: "morning" | "night") => {
    const key = (type + "Weight") as keyof FormFields;
    const val = formFields[key];
    setFormFields((prev) => ({
      ...prev,
      [key]:
        val === null || val === 0
          ? null
          : Math.abs(parseFloat(val as string)).toFixed(1),
    }));
  };

  return (
    <>
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <div className="DateSelector">
          <DatePicker
            showIcon
            toggleCalendarOnIconClick
            selected={date}
            onChange={(d) => setDate(d ?? new Date())}
            className="DatePicker"
            customInput={
              <input
                style={{
                  color: darkMode ? "#b5b2bc" : "#65636d",
                  fontSize: "20px",
                }}
              />
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                style={{
                  height: "20px",
                  width: "20px",
                  marginTop: "2px",
                  color: darkMode ? "#b5b2bc" : "#65636d",
                }}
              >
                <mask id="ipSApplication0">
                  <g
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  >
                    <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                    <path
                      fill="#fff"
                      d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                    ></path>
                  </g>
                </mask>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSApplication0)"
                ></path>
              </svg>
            }
          />
        </div>

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
            Good morning! Enter your dry weight (after using the bathroom) and
            any comments.
          </p>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="morning-weight">
              Morning Weight
            </label>
            <input
              className="Input"
              id="morning-weight"
              placeholder={
                recentEntry && recentEntry.morning_weight !== null
                  ? String(recentEntry.morning_weight)
                  : "..."
              }
              type="number"
              value={formFields.morningWeight ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setFormFields((prev) => ({
                  ...prev,
                  morningWeight: val === "" ? null : parseFloat(e.target.value),
                }));
              }}
              onBlur={() => handleBlur("morning")}
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
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <form onSubmit={handleSaveLog} className="LogForm">
              <button
                className="Button red"
                type="button"
                onClick={() =>
                  setFormFields((prev) => ({
                    ...prev,
                    morningWeight: null,
                    morningNotes: "",
                  }))
                }
              >
                X
              </button>
              <button className="Button green" type="submit">
                Save
              </button>
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
              placeholder={
                recentEntry && recentEntry.night_weight !== null
                  ? String(recentEntry.night_weight)
                  : "..."
              }
              type="number"
              value={formFields.nightWeight ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setFormFields((prev) => ({
                  ...prev,
                  nightWeight: val === "" ? null : parseFloat(e.target.value),
                }));
              }}
              onBlur={() => handleBlur("night")}
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
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "flex-end",
            }}
          >
            <form onSubmit={handleSaveLog} className="LogForm">
              <button
                className="Button red"
                type="button"
                onClick={() =>
                  setFormFields((prev) => ({
                    ...prev,
                    nightWeight: null,
                    nightNotes: "",
                  }))
                }
              >
                X
              </button>
              <button className="Button green" type="submit">
                Save
              </button>
            </form>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default Log;
