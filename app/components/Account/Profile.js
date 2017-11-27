import React from 'react';
import { connect } from 'react-redux'
import { updateProfile, changePassword, deleteAccount, generateApiKey, getApiKey} from '../../actions/auth';
import { link, unlink } from '../../actions/oauth';
import Messages from '../Messages';
import {Helmet} from "react-helmet";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.user.email,
      name: props.user.name,
      gender: props.user.gender,
      location: props.user.location,
      website: props.user.website,
      gravatar: props.user.gravatar,
      aKey: props.user.token,
      user_id: props.user.id,
      password: '',
      confirm: ''
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleProfileUpdate(event) {
    event.preventDefault();
    this.props.dispatch(updateProfile(this.state, this.props.token));
  }
  handleAPIKey(event) {
    event.preventDefault();
    this.props.dispatch(generateApiKey(this.state, this.props.token));
    this.props.dispatch(getApiKey(this.state, this.props.token)).then(()=>{
      console.log(this.props)
      this.setState({ aKey: this.props.apiKey});
   })
  }
  handleGetAPIKey(event) {
    return this.state.aKey;

  }
  handleChangePassword(event) {
    event.preventDefault();
    this.props.dispatch(changePassword(this.state.password, this.state.confirm, this.props.token));
  }

  handleDeleteAccount(event) {
    event.preventDefault();
    this.props.dispatch(deleteAccount(this.props.token));
  }

  handleLink(provider) {
    this.props.dispatch(link(provider))
  }

  handleUnlink(provider) {
    this.props.dispatch(unlink(provider));
  }

  render() {

    return (

      <div className="grid-container">
      <Helmet>
        <title>(coming soon) My Account / fileshr.io</title>
      </Helmet>
      <div key="pageDiv" className="grid-x grid-padding-x fluid callout secondary">
      <Messages messages={this.props.messages}/>
      <form onSubmit={this.handleProfileUpdate.bind(this)}>
      <table>
      <tbody style={{backgroundColor: "#eaeaea"}}>
      <tr><td><h5>Profile Information</h5></td></tr>
      <tr>
      <td>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" value={this.state.email || ''} onChange={this.handleChange.bind(this)}/>
      </td>
      <td>
      <label htmlFor="name">Name</label>
      <input type="text" name="name" id="name" value={this.state.name || ''} onChange={this.handleChange.bind(this)}/>
      </td>
      <td>
      &nbsp;
      </td>
      <td>
      <label>Gender</label>
      <input type="radio" name="gender" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="male">Male</label>
      <input type="radio" name="gender" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange.bind(this)}/>
      <label htmlFor="female">Female</label>
      </td>
      </tr>
      <tr>
      <td>
      <label htmlFor="location">Location</label>
      <input type="text" name="location" id="location" value={this.state.location|| ''} onChange={this.handleChange.bind(this)}/>
      </td>
      <td>
      <label htmlFor="website">Website</label>
      <input type="text" name="website" id="website" value={this.state.website|| ''} onChange={this.handleChange.bind(this)}/>
      </td>
      <td>
      &nbsp;
      </td>
      <td>
      <label>Gravatar</label>
      <img src={this.state.gravatar} className="gravatar" width="100" height="100"/>
      </td>
      </tr>
      <tr>
      <td><button type="submit" className="success button">Update Profile</button></td>
      </tr>
      </tbody>
      </table>
      </form>

      <form onSubmit={this.handleChangePassword.bind(this)}>
      <table>
      <tbody style={{backgroundColor: "#eaeaea"}}>
      <tr></tr>
      <tr>
      <td>
      <h5>Change Password</h5>
      </td>
      </tr>
      <tr>
      <td>
      <label htmlFor="password">New Password</label>
      <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
      </td>
      <td>
      <label htmlFor="confirm">Confirm Password</label>
      <input type="password" name="confirm" id="confirm" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
      </td>
      </tr>
      <tr>
      <td>
      <button type="submit" className="success button">Change Password</button>
      </td>
      </tr>
      </tbody>
      </table>
      </form>

      <form onSubmit={this.handleAPIKey.bind(this)}>
      <table>
      <tbody style={{'backgroundColor': "#eaeaea"}}>
      <tr><td><h5>API Key</h5></td></tr>
      <tr>
      <td>
      <p>Existing API Key is displayed if already generated. To generate a new API Key, or reset an existing one, click the button. Generating a new API key will overwrite any existing API credentials.</p>
      </td>
      </tr>
      <tr>
      <td>
      <label htmlFor="apikey">API Key</label>
      <input type="text" name="apikey" id="apikey" disabled='true' value={this.state.aKey|| ''} onChange={this.handleChange.bind(this)} />
      <label htmlFor="user_id">User ID</label>
      <input type="text" name="userid" id="userid" disabled='true' value={this.state.user_id|| ''} onChange={this.handleChange.bind(this)} />
      </td>
      </tr>
      <tr><td><button type="submit" className="button">Generate new API Key</button></td></tr>
      </tbody>
      </table>
      </form>


      <form onSubmit={this.handleDeleteAccount.bind(this)}>
      <table>
      <tbody style={{'backgroundColor': "#eaeaea"}}>
      <tr><td><h5>Delete Account</h5></td></tr>
      <tr>
      <td>
      <p>You can delete your account, but keep in mind this action is irreversible.</p>
      </td>
      </tr>
      <tr><td><button type="submit" className="alert button">Delete my account</button></td></tr>
      </tbody>
      </table>
      </form>
      </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    apiKey: state.auth.apiKey,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Profile);
