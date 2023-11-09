import React, {useState} from "react";
// import NextStep from "./components/NextStep";
// import "./TFI.css";

const TFI = () => {
  const [showNextStep, setShowNextStep] = useState(false);

  return (
    <>
      <main id="tfi-background" classname="tfi-background h-[100%]">
          <button onClick={() => setShowNextStep(!showNextStep)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
           {showNextStep ? 'Hide Next Step' : 'Show Next Step'}
          </button>
           <div>
            {showNextStep && <NextStep />}
              <iframe
            src="https://form.jotform.com/232924255172051"
            title="Embedded Form"
            width="100%"
            height="4500"
          />
           </div>
      </main>
    </>
  );
};

export default TFI;
