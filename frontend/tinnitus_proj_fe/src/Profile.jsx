import '@passageidentity/passage-elements/passage-profile';

function Profile() {
  return (
      <div>
        <passage-profile app-id={import.meta.env.VITE_REACT_APP_PASSAGE_APP_ID}></passage-profile>
      </div>
  );
}
export default Profile;