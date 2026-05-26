import { motion } from 'framer-motion';
import { useState } from 'react';
import type { StepThreeProps } from '../../types';
import { CheckCircle, Copy, Download } from 'lucide-react';

export const StepThree = ({ formData, onBack, onSubmit }: StepThreeProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    console.log('Final Registration Data:', formData);
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 1500);
  };

  const handleCopy = () => {
    const data = JSON.stringify(formData, null, 2);
    navigator.clipboard.writeText(data);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const data = JSON.stringify(formData, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    element.setAttribute('download', 'registration-data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-6"
        >
          <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-slate-900 mb-2"
        >
          Registration Complete!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 mb-6"
        >
          Welcome aboard, {formData.firstName}! Your account has been created successfully.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-emerald-50 border-2 border-emerald-500 rounded-lg p-4 mt-8"
        >
          <p className="text-emerald-600 font-semibold">✓ Account created successfully</p>
          <p className="text-sm text-slate-600 mt-2">A confirmation email has been sent to {formData.email}</p>
        </motion.div>
      </motion.div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Review Your Information</h2>
        <p className="text-slate-600">Please verify all details before submitting</p>
      </div>

      {/* Personal Information Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-sky-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">First Name</p>
            <p className="text-lg font-semibold text-slate-900">{formData.firstName}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Last Name</p>
            <p className="text-lg font-semibold text-slate-900">{formData.lastName}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4 md:col-span-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Date of Birth</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatDate(formData.dateOfBirth)} ({calculateAge(formData.dateOfBirth)} years old)
            </p>
          </div>
        </div>
      </motion.div>

      {/* Account Details Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <span className="bg-sky-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
          Account Details
        </h3>
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Email Address</p>
            <p className="text-lg font-semibold text-slate-900 break-all">{formData.email}</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Password Security</p>
            <p className="text-sm text-success font-semibold">✓ Secure password configured</p>
          </div>
        </div>
      </motion.div>

      {/* JSON Preview */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-slate-100 overflow-x-auto"
      >
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-3"
      >
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={handleCopy}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy Data'}
          </motion.button>
          <motion.button
            type="button"
            onClick={handleDownload}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-4 h-4" />
            Download
          </motion.button>
        </div>

        <div className="flex gap-4">
          <motion.button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Edit
          </motion.button>
          <motion.button
            type="button"
            onClick={handleSubmit}
            className="btn-primary flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Complete Registration
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
