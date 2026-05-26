import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema } from '../../schemas/formSchema';
import type { StepTwoData } from '../../schemas/formSchema';
import type { StepTwoProps } from '../../types';
import { Eye, EyeOff } from 'lucide-react';

export const StepTwo = ({ formData, onNext, onBack }: StepTwoProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<StepTwoData>({
    resolver: zodResolver(stepTwoSchema),
    mode: 'onChange',
    defaultValues: {
      email: formData.email || '',
      password: formData.password || '',
      confirmPassword: formData.confirmPassword || '',
    },
  });

  const passwordValue = watch('password', '');
  const confirmPasswordValue = watch('confirmPassword', '');
  const passwordStrength = getPasswordStrength(passwordValue);

  function getPasswordStrength(password: string): { score: number; label: string; color: string } {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
    if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-orange-500' };
    if (score <= 3) return { score: 3, label: 'Good', color: 'bg-yellow-500' };
    if (score <= 4) return { score: 4, label: 'Strong', color: 'bg-blue-500' };
    return { score: 5, label: 'Very Strong', color: 'bg-emerald-500' };
  }

  const onSubmit = (data: StepTwoData) => {
    onNext(data);
  };

  const handleBackClick = () => {
    onBack(getValues());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Account Details</h2>
        <p className="text-slate-600">Create your secure account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className={`input-field ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="Enter a strong password"
              className={`input-field pr-12 ${errors.password ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {passwordValue && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${passwordStrength.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className={`text-xs font-bold ${
                  passwordStrength.color === 'bg-red-500' ? 'text-red-500' :
                  passwordStrength.color === 'bg-orange-500' ? 'text-orange-500' :
                  passwordStrength.color === 'bg-yellow-500' ? 'text-yellow-500' :
                  passwordStrength.color === 'bg-blue-500' ? 'text-blue-500' :
                  'text-emerald-500'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                <li className={passwordValue.length >= 8 ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                  {passwordValue.length >= 8 ? '✓' : '○'} At least 8 characters
                </li>
                <li className={/[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                  {/[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) ? '✓' : '○'} Mix of uppercase and lowercase
                </li>
                <li className={/[0-9]/.test(passwordValue) ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                  {/[0-9]/.test(passwordValue) ? '✓' : '○'} Contains a number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? 'text-emerald-600 font-medium' : 'text-slate-400'}>
                  {/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue) ? '✓' : '○'} Contains a special character
                </li>
              </ul>
            </motion.div>
          )}

          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        {/* Confirm Password */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              placeholder="Re-enter your password"
              className={`input-field pr-12 ${errors.confirmPassword ? 'input-error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {passwordValue && confirmPasswordValue && passwordValue === confirmPasswordValue && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-600 text-sm mt-2 font-medium"
            >
              ✓ Passwords match
            </motion.p>
          )}

          {errors.confirmPassword && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.confirmPassword.message}
            </motion.p>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-8"
        >
          <motion.button
            type="button"
            onClick={handleBackClick}
            className="btn-secondary flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
          <motion.button
            type="submit"
            disabled={!isValid}
            className="btn-primary flex-1"
            whileHover={isValid ? { scale: 1.02 } : {}}
            whileTap={isValid ? { scale: 0.98 } : {}}
          >
            Review & Submit
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

