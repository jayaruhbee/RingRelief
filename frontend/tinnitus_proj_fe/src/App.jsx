import "@passageidentity/passage-elements/passage-auth";

import "./App.css";
const passageAppId = import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID;
console.log("passageappid", passageAppId)

function App() {
  return (
    <>
      <div>
        <passage-auth app-id={passageAppId}></passage-auth>
      </div>{" "}
    </>
  );
}

export default App;
