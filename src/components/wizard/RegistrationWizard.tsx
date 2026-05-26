import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import type { RegistrationFormData } from '../../schemas/formSchema';

const INITIAL_FORM_DATA: Partial<RegistrationFormData> = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegistrationWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationFormData>>(INITIAL_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const TOTAL_STEPS = 3;

  const handleStepOneNext = (data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStepTwoNext = (data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStepTwoBack = (data: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(1);
  };

  const handleStepThreeBack = () => {
    setCurrentStep(2);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    console.log('Final Registration Data Object:', formData);
  };

  const handleBackToHome = () => {
    setCurrentStep(1);
    setFormData(INITIAL_FORM_DATA);
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-slate-100">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-slate-900 mb-2 font-display"
            >
              Success!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 mb-6 font-medium"
            >
              Your registration has been completed successfully. Welcome aboard, {formData.firstName}!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-sky-50 border-l-4 border-sky-600 p-4 rounded-lg text-left mb-8"
            >
              <p className="text-sm font-semibold text-sky-900">
                A confirmation email has been sent to <span className="underline font-bold">{formData.email}</span>.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={handleBackToHome}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Main Card Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border border-slate-100/50 backdrop-blur-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight font-display bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Registration Wizard
            </h1>
            <p className="text-slate-500 font-medium">
              Join our community in just a few simple steps
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </motion.div>

          {/* Form Steps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {currentStep === 1 && (
                <StepOne
                  formData={formData}
                  onNext={handleStepOneNext}
                />
              )}
              {currentStep === 2 && (
                <StepTwo
                  formData={formData}
                  onNext={handleStepTwoNext}
                  onBack={handleStepTwoBack}
                />
              )}
              {currentStep === 3 && (
                <StepThree
                  formData={formData as RegistrationFormData}
                  onBack={handleStepThreeBack}
                  onSubmit={handleSubmit}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-slate-400 font-semibold">
            We take your privacy seriously. All your data is encrypted and secure.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

