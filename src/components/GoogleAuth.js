import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignIn: null };

  componentDidMount() {
    window.gapi.load("auth2", () => {
      window.gapi.auth2
        .init({
          client_id:
            "674056344842-v5og52gccln3aui1p776ion9sotmtuq4.apps.googleusercontent.com",
          scope: "profile email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.setState({ isSignIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignIn: this.auth.isSignedIn.get() });
  };

  renderAuthButton() {
    if (this.state === null) {
      return null;
    } else if (this.state.isSignIn) {
      return (
        <button onClick={this.onSignOut} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  onSignIn = () => {
    return this.auth.signIn();
  };

  onSignOut = () => {
    return this.auth.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
