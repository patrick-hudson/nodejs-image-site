import React from 'react';
import { IndexLink, Link } from 'react-router';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

class Header extends React.Component {
  componentDidMount() {
    // Initialize Foundation
    $(document).foundation();
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(logout());
  }

  render() {
    const rightNav = this.props.token ? (
      <div className="top-bar-right">
        <ul className="dropdown menu" data-dropdown-menu>
          <li className="has-submenu">
          <a href="#0">Account</a>
            <ul className="submenu menu vertical" data-submenu>
              <li><a href="/account">My Account</a></li>
              <li><a href="#" onClick={this.handleLogout.bind(this)}>Logout</a></li>
            </ul>
            </li>
        </ul>
      </div>
    ) : (
      <div className="top-bar-right">
        <ul className="menu">
          <li><a href="/login">Log in</a></li>
          <li><a href="/signup">Sign up</a></li>
        </ul>
      </div>
    );



    return (
      <div>
      <div className="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="medium">
        <button className="menu-icon" type="button" data-toggle="responsive-menu"></button>
        <div className="title-bar-title">Menu</div>
      </div>
      <div className="top-bar" id="responsive-menu">
        <div className="top-bar-left">
          <span data-responsive-toggle="responsive-menu" data-hide-for="medium">
            <span className="menu-icon light" data-toggle></span>
          </span>
          <ul className="menu">
            <li><a href="/">Home</a></li>
            <li><a href="/upload">Upload</a></li>
            <li><a href="/gallery">My Library</a></li>
          </ul>
        </div>
          {rightNav}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Header);
