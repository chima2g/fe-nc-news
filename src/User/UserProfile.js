import React from "react";

class UserProfile extends React.Component {
  render() {
    const { justLoggedIn } = window.history.state;
    let { loggedInUsername } = this.props;

    return (
      <div>
        {justLoggedIn && <p>Good to have you back!</p>}
        <p>{loggedInUsername ? `User Profile: ` : "Please log in!"}</p>
      </div>
    );
  }
}

export default UserProfile;
