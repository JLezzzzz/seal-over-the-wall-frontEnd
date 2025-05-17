// Create.jsx
import React from 'react';
import CreateStepper from "../components/createDesignPage/CreateStepper";
import CreateDesign from "./CreateDesign";
import CollectDetails from "./CollectDetails";
import ExpressAndPublish from "./ExpressAndPublish";
import Preview from "./Preview";
import { useNavigate } from 'react-router-dom';

function Create() {
  const [step, setStep] = React.useState(() => {
    const saved = localStorage.getItem('create-step');
    return saved ? parseInt(saved, 10) : 0;
  });

  const navigate = useNavigate();

  const [createData, setCreateData] = React.useState({
    createdesign: {},
    collectdetails: {},
    expressandpublish: {}
  });

  const updateCreateData = (newData) => {
    setCreateData((prev) => ({
      ...prev,
      ...newData
    }));
  };

  const handleNext = (newData = {}) => {
    updateCreateData(newData);

    setStep((prev) => {
      const nextStep = prev + 1;

      if (nextStep > 3) {
        // Finish and redirect to shop
        localStorage.removeItem('create-step');
        setCreateData({
          createdesign: {},
          collectdetails: {},
          expressandpublish: {}
        });
        navigate('/shop');
        return prev; // don't update step anymore
      }

      return nextStep;
    });
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleReset = () => {
    localStorage.removeItem('create-step');
    setStep(0);
  };
  const handleEdit = () => setStep(0);

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <CreateDesign
            onNext={handleNext}
            updateCreateData={updateCreateData}
            step={step}
          />
        );
      case 1:
        return (
          <CollectDetails
            createData={createData}
            onNext={handleNext}
            onBack={handleBack}
            updateCreateData={updateCreateData}
            step={step}
          />
        );
      case 2:
        return (
          <ExpressAndPublish
            onNext={handleNext}
            onBack={handleBack}
            onEdit={handleEdit}
            createData={createData}
            step={step}
          />
        );
      case 3:
        return (
          <Preview
            createData={createData}
            onNext={handleNext}
            onReset={handleReset}
            onBack={handleBack}
            onEdit={handleEdit}
            step={step}
          />
        );
      default:
        return null;
    }
  };

  React.useEffect(() => {
    localStorage.setItem('create-step', step.toString());
  }, [step]);

  return (
    <div className="flex flex-col justify-center items-center mt-40">
      <CreateStepper step={step} setStep={setStep} />
      {renderStepContent()}
    </div>
  );
}

export default Create;
