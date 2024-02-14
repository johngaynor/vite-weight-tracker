export type LogFormFields = {
  morningWeight: number | null | string;
  morningNotes: string;
  nightWeight: number | null;
  nightNotes: string;
};

export type AuthFormFields = {
  loginEmail: string;
  loginPassword: string;
  registerEmail: string;
  registerPassword: string;
  registerConfirmPassword: string;
};
