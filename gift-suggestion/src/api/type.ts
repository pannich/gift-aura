type FormData = {
  gender: string;
  mbtiType: string;
  auraColor: string;
};

type StepFormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type {
  FormData,
  StepFormProps };
