import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema } from '../../schemas/formSchema';
import type { StepOneData } from '../../schemas/formSchema';
import type { StepOneProps } from '../../types';

export const StepOne = ({ formData, onNext }: StepOneProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<StepOneData>({
    resolver: zodResolver(stepOneSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
    },
  });

  const onSubmit = (data: StepOneData) => {
    onNext(data);
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2 font-display">Personal Information</h2>
        <p className="text-slate-600">Let's start with your basic details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            First Name *
          </label>
          <input
            type="text"
            {...register('firstName')}
            placeholder="John"
            className={`input-field ${errors.firstName ? 'input-error' : ''}`}
          />
          {errors.firstName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.firstName.message}
            </motion.p>
          )}
        </motion.div>

        {/* Last Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            {...register('lastName')}
            placeholder="Doe"
            className={`input-field ${errors.lastName ? 'input-error' : ''}`}
          />
          {errors.lastName && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.lastName.message}
            </motion.p>
          )}
        </motion.div>

        {/* Date of Birth */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-slate-800 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            {...register('dateOfBirth')}
            className={`input-field ${errors.dateOfBirth ? 'input-error' : ''}`}
          />
          {errors.dateOfBirth && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm mt-2 font-medium"
            >
              {errors.dateOfBirth.message}
            </motion.p>
          )}
        </motion.div>

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          type="submit"
          disabled={!isValid}
          className="btn-primary w-full mt-8"
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
        >
          Continue to Account Details
        </motion.button>
      </form>
    </motion.div>
  );
};

