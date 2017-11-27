import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { signup } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';
import {Helmet} from "react-helmet";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSignup(event) {
    event.preventDefault();
    this.props.dispatch(signup(this.state.name, this.state.email, this.state.password));
  }

  handleFacebook() {
    this.props.dispatch(facebookLogin())
  }

  handleTwitter() {
    this.props.dispatch(twitterLogin())
  }

  handleGoogle() {
    this.props.dispatch(googleLogin())
  }

  handleVk() {
    this.props.dispatch(vkLogin())
  }

  handleGithub() {
    this.props.dispatch(githubLogin())
  }

  render() {
    return (
      <div className="grid-container">
      <Helmet>
        <title>(coming soon) Sign Up / fileshr.io</title>
      </Helmet>
        <div className="grid-x">
          <div className="cell">
            <div className="callout large alert">
              <h2>Error</h2>
              <p>Sorry, Signups are closed</p>
              <p>If you feel this is an error, please contact us.</p>
            </div>
            </div>
        </div>
              </div>
        //<div key="pageDiv" className="grid-x grid-padding-x callout secondary">
        //  <div className="cell">
        //    <Messages messages={this.props.messages}/>
        //    <form onSubmit={this.handleSignup.bind(this)}>
        //      <h4>Create an account</h4>
        //      <label>Name
        //      <input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange.bind(this)} autoFocus/>
        //      </label>
        //      <label>Email
        //      <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
        //      </label>
        //      <label>Password
        //      <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} //onChange={this.handleChange.bind(this)}/>
        //      </label>
        //      <p className="help-text">By signing up, you agree to the <Link to="/">Terms of Service</Link>.</p>
        //      <button type="submit" className="button">Create an account</button>
        //    </form>
        //    </div>
        //    <div className="hr-title"><span>or</span></div>
        //    <div className="button-group">
        //    </div>
        //    <p>Already have an account? <Link to="/login">Log in</Link></p>
        //</div>
        //<title>Sign Up</title>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Signup);
