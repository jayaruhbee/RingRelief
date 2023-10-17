// import "@passageidentity/passage-elements/passage-register";
import '@passageidentity/passage-elements/passage-auth';
import React from "react";
import axios from "axios";

function App() {
  const onSuccess = (authResult) => {
    document.cookie = "psg_auth_token=" + authResult.authToken + ";path=/";

    const urlParams = new URLSearchParams(window.location.search);
    const magicLink = urlParams.has("psg_magic_link")
      ? urlParams.get("psg_magic_link")
      : null;

    if (magicLink !== null) {
      setTimeout(() => {
        window.location.href = authResult.redirectURL;
      }, 3000);
    } else {
      axios
        .post("create_user/")
        .then((response) => {
          const newUser = response.data;
          window.location.href = authResult.redirectURL;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <passage-auth
        app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}
        onSuccess={onSuccess}
      ></passage-auth>
    </div>
  );
}

export default App;
