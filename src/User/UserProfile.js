import React from 'react';

class UserProfile extends React.Component {
    
    render() {
        const {justLoggedIn} = window.history.state;
        let {loggedInUsername} = this.props;

        return <div>
                    {justLoggedIn && <p>Welcome back!</p>}
                    <p>{(loggedInUsername)? `User Profile: ${loggedInUsername}` : "Please log in!"}</p>
                </div>
    }
}  

export default UserProfile;
