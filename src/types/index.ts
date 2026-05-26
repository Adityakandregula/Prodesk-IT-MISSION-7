import type { RegistrationFormData } from '../schemas/formSchema';

export interface StepOneProps {
  formData: Partial<RegistrationFormData>;
  onNext: (data: Partial<RegistrationFormData>) => void;
}

export interface StepTwoProps {
  formData: Partial<RegistrationFormData>;
  onNext: (data: Partial<RegistrationFormData>) => void;
  onBack: (data: Partial<RegistrationFormData>) => void;
}

export interface StepThreeProps {
  formData: RegistrationFormData;
  onBack: () => void;
  onSubmit: () => void;
}

