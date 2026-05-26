import { z } from 'zod';

export const stepOneSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  dateOfBirth: z
    .string()
    .refine((date) => {
      if (!date) return false;
      const birth = new Date(date);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return age >= 18;
    }, 'You must be at least 18 years old'),
});

export const stepTwoBaseSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  
  confirmPassword: z.string(),
});

export const stepTwoSchema = stepTwoBaseSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const registrationSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoBaseSchema.shape,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;

