export type LogFormFields = {
  morningWeight: number | null | string;
  morningNotes: string;
  nightWeight: number | null | string;
  nightNotes: string;
};

export type AuthFormFields = {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
};

export type LogFormChanges = {
  morningWeight: boolean;
  morningNotes: boolean;
  nightWeight: boolean;
  nightNotes: boolean;
};
