import React, { useState } from "react";
import "./MediMap.css";
import { api } from "./utilities";
// import NextStep from "./components/NextStep";
const MediMap = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userText, setUserText] = useState('');
  // const [showNextStep, setShowNextStep] = useState(false);


  const handleInputChange = (event) => {
    setUserText(event.target.value);
  };

  const fetchData = async () => {
    try {
  
      if (!userText) {
        setErrorMessage("Please write something before posting.");
        console.log("User input is empty.");
        return; // Exit the function
      }
  
      const response = await api.post("portal/get_data/",
        { userText },
      );
  
      console.log(response.data, "RSESS");
      const data = response.data; 
      setErrorMessage("");
  

      const mermaidSyntax = generateFlowchart(data);

      const html = `
            <html>
              <head>
                <title>Flowchart Generator</title>
                <link rel="stylesheet" type="text/css" href="style.css" />
              </head>
              <body>
               <center>
                  <h1>Your MediMap</h1>
        
                    <pre class="mermaid" id="flowchart">
                      ${mermaidSyntax}
                    </pre>
                    <script type="module">
                      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
                    </script>
        
               </center>
              </body>
            </html>
            `;

      const popupWindow = window.open("", "", "width=600,height=600");
      popupWindow.document.open();
      popupWindow.document.write(html);
      popupWindow.document.close();
    } catch (error) {
      console.error(error);
    }
  }



      
      function generateFlowchart(data) {
        const { flow } = data;
      
        if (!flow || !Array.isArray(flow)) {
          return ''; // Handle invalid data
        }
      
        // Initialize the Mermaid syntax
        let mermaidSyntax = 'graph TD;\n';
      
        for (let i = 0; i < flow.length; i++) {
          const stepText = flow[i];
          const nodeName = `step${i}`;
      
          mermaidSyntax += `${nodeName}["${stepText}"]`;
      
          if (i < flow.length - 1) {
            const nextNodeName = `step${i + 1}`;
            mermaidSyntax += ` --> ${nextNodeName}`;
          }
      
          mermaidSyntax += ';\n';
        }
      
        return mermaidSyntax;
      }
      
    return(
        <>
        <div id="MediMap-wrapper">
            
            <h1 id="medimapTitle" >MediMap</h1>

        <p id="medimapExp">
          {" "}
          Please share your tinnitus story. Tell us when it started, any doctors
          you've seen, any medications or treatments you've tried, and how it
          has impacted your life. Your detailed story will help us create a
          personalized medical history flowchart for you.{" "}
        </p>
        <textarea
          id="inputText"
          placeholder="My tinnitus started when..."
          value={userText} onChange={handleInputChange}
        ></textarea>

        {errorMessage ? (
          <span id="errspanmm" className="text-red-600 text-sm">
            {errorMessage}
          </span>
        ) : (
          <span id="errspanmm" className="text-sm">
            {" "}
          </span>
        )}

        <button
          className="button-css"
          id="createFlowchart"
          onClick={() => fetchData()}
        >
          Create My MediMap
        </button>

        {/* <button onClick={openForm}>
        Open Form
        </button> */}
      </div>
    </>
  );
};

export default MediMap;
