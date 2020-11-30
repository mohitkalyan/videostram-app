import React from "react";
import { signIn, signOut } from "../actions";
import { connect } from "react-redux";

class GoogleAuth extends React.Component {
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
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignIn) => {
    if (isSignIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  onSignInClick = () => {
    return this.auth.signIn();
  };

  onSignOutClick = () => {
    return this.auth.signOut();
  };

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignIn };
};

GoogleAuth = connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

export default GoogleAuth;
