import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import Messages from '../Messages';
import Cookies from 'universal-cookie';
var settings = require('../../../config/settings.js');
import {Helmet} from "react-helmet";

class Image extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props.user);
    this.state = { image_id: '', original_userid: '', user_id: '', imageOwnedByUser: '', image_name: ''};
  }
  componentWillMount() {
    const cookies = new Cookies();
    var token = cookies.get('token');
    return fetch('/image/checkPermissions', {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        authorization: token,
        user_id: this.props.route.user_id,
        image_id: this.props.params.imageid
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          if (json.length == 0){
            console.log('Image not found');
          }
          else if (json.length > 1) {
            console.log('Too many images found.. Odd...');
          }
          else{
            if (json['0'].user_id == this.props.route.user_id.id){
              this.setState({
               imageOwnedByUser: true,
               image_name: json['0'].file_id + json['0'].file_ext
             })
            }

          }

        });
      } else {
        return response.json().then((json) => {
          console.log(json);
        });
      }
    });
  }
  render() {
    console.log(settings);
    if(this.state.imageOwnedByUser){
      var imgsrc = settings.short_url+this.state.image_name;
      var bbcode = "[img]"+settings.short_url+this.state.image_name+"[/img]";
      return (
        <div className="grid-container">
        <Helmet>
          <title>View Image/ fileshr.io</title>
        </Helmet>
        <div className="card">
          <div className="card-section">
            <center><img src={imgsrc} /></center>
          </div>
          <div className="card-section">
            <div className="grid-x grid-margin-x">
              <div className="medium-6 cell">
              <label>Direct Link
                <input type="text" disabled='true' value={imgsrc} />
              </label>
              </div>
              <div className="medium-6 cell">
              <label>BBCode
                <input type="text" disabled='true' value={bbcode} />
              </label>
              </div>
            </div>
            <br />
          <div className="grid-x grid-margin-x">
            <div className="medium-6 cell">
              <a href="#" className="button">Copy Image Link</a>
            </div>
            <div className="medium-6 cell">
              <a href="#" className="button alert">Delete Image</a>
            </div>
          </div>
          </div>
        </div>
        </div>
      );
    }
    else if(this.state.imageOwnedByUser == ''){
      return (
        <div className="grid-container"></div>
      );
    }
    else{
      return (
      <div className="grid-container">
        <div className="grid-x">
          <div className="cell">
            <div className="callout large alert">
              <h2>Error</h2>
              <p>You appear to be trying to access an image that is not linked to your account.</p>
              <p>If you feel this is an error, please contact us.</p>
              <a href="/gallery">Return to My Library</a>
            </div>
            </div>
        </div>
      </div>
      );
    }


  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Image);
