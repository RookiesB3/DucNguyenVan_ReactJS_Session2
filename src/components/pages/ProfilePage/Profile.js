import React from "react";
import "./Profile.css";
import Container from "react-bootstrap/Container";

const Profile = () => {
  return (
    <div className="profile-control">
      <Container>
        <h2>Profile</h2>
        <div>Name: Elisa Runolfsson </div>
        <div> UserID: 3</div>
      </Container>
    </div>
  );
};

export default Profile;
