import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Upload from './components/Upload/Upload';
import Gallery from './components/Gallery/Gallery';
import Image from './components/Image/Image';
import ShareImage from './components/Image/ShareImage';
export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
    else {
      return store.getState().auth.token;
    }
  };
  const getUserInfo = (nextState, replace) => {
      return store.getState().auth.token;
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages} title="Contact Us!"/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/upload" onEnter={ensureAuthenticated} component={Upload} onLeave={clearMessages}/>
      <Route path="/gallery" onEnter={ensureAuthenticated} component={Gallery} onLeave={clearMessages}/>
      <Route path="/gallery/:page" onEnter={ensureAuthenticated} component={Gallery} onLeave={clearMessages}/>
      <Route path="/image/:imageid" onEnter={ensureAuthenticated} component={Image} onLeave={clearMessages} user_id={store.getState().auth.user}/>
      <Route path="/image/:imageid/share" component={ShareImage} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
