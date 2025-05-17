import React from 'react';
import { motion } from 'framer-motion';
import arrowright from "/assets/images/create-design-pages/arrow-right.svg";

function NextStepButton({ onNext, step }) {
  const isLastStep = step === 3;
  const buttonLabel = isLastStep ? "Publish" : "Next Step";
  const buttonClass = isLastStep
    ? "bg-[#324DD8] hover:bg-blue-700"
    : "bg-primary-black";

  return (
    <motion.button
      type="button"
      onClick={onNext}
      className={`w-[256px] h-[48px] ${buttonClass} text-white font-medium py-2 px-4 rounded-[8px] relative flex items-center justify-center cursor-pointer overflow-hidden`}
      whileHover={{ x: 10 }}
      whileTap={{ scale: 0.96 }}
    >
      {buttonLabel}
      <motion.img
        src={arrowright}
        alt="Arrow right"
        className="ml-4"
        initial={{ x: 0 }}
        whileHover={{ x: 6 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
    </motion.button>
  );
}

export default NextStepButton;
