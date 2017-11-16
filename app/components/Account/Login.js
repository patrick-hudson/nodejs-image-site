import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { login } from '../../actions/auth';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.email, this.state.password));
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
        <div key="pageDiv" className="grid-x grid-padding-x callout secondary">
          <div className="cell">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleLogin.bind(this)}>
              <h4>Log In</h4>
              <label>Email
              <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus/>
              </label>
              <label>Password
              <input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
              </label>
              <p><Link to="/forgot">Forgot your password?</Link></p>
              <button type="submit" className="button">Log in</button>
            </form>
            <div className="hr-title"><span>or</span></div>
            <div className="button-group">
            </div>
            <p>Dont have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
        <title>Log In</title>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Login);
