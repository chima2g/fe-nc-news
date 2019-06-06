import React from 'react';

class UserProfile extends React.Component {
    
    render() {
        const {justLoggedIn} = window.history.state;
        const {loggedInUsername} = this.props;
        return <div>
                    {justLoggedIn && <p>Welcome back {loggedInUsername}</p>}
                    <p>{(loggedInUsername)? "User Profile" : "Please log in!"}</p>
                </div>
    }
}  

export default UserProfile;
