import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Personal Info', 'Account Details', 'Review & Submit'];

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8 select-none">
      <div className="flex justify-between mb-3 items-end">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Current Phase</span>
          <h3 className="text-lg font-bold text-slate-800">
            {STEP_LABELS[currentStep - 1]}
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400">Progress</span>
          <p className="text-sm font-bold text-slate-700">{Math.round(progress)}%</p>
        </div>
      </div>
      
      {/* Progress Bar Track */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-200/50">
        <motion.div
          className="bg-gradient-to-r from-sky-500 to-sky-600 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center relative mt-6 px-1">
        {/* Horizontal background line to connect steps */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-100 -z-10" />

        {Array.from({ length: totalSteps }).map((_, index) => {
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;

          return (
            <div key={index} className="flex flex-col items-center flex-1 z-10">
              <motion.div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-100'
                    : isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-200 ring-4 ring-sky-50'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {isCompleted ? '✓' : index + 1}
              </motion.div>
              <span className={`text-[11px] font-bold mt-2 hidden sm:inline transition-colors duration-300 ${
                isActive ? 'text-sky-600 font-extrabold' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
              }`}>
                {STEP_LABELS[index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

