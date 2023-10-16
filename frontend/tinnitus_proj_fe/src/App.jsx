import "@passageidentity/passage-elements/passage-register";
import React from "react";
import "./App.css";



function App() {
  return (
    <>
      <div>
        <passage-register app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}></passage-register>
      </div>
    </>
  );
}

export default App;
