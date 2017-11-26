import React from 'react';
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions/auth';
import Messages from '../Messages';

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleForgot(event) {
    event.preventDefault();
    this.props.dispatch(forgotPassword(this.state.email));
  }

  render() {
    return (
      <div className="grid-container">
        <div key="pageDiv" className="grid-x grid-padding-x callout secondary">
          <div className="cell">
          <Messages messages={this.props.messages}/>
          <form onSubmit={this.handleForgot.bind(this)}>
            <h4>Forgot Password</h4>
            <p>Enter your email address below and well send you password reset instructions.</p>
            <label>Email
            <input type="email" name="email" id="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this)} autoFocus/>
            </label>
            <button type="submit" className="button success">Reset Password</button>
          </form>
        </div>
      </div>
      <title>Forgot Password</title>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Forgot);