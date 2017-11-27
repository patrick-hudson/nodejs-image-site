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
    this.state = { image_id: '', original_userid: '', user_id: '', imageOwnedByUser: '', image_name: '', image_ext: ''};
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
               image_name: json['0'].file_id + json['0'].file_ext,
               image_ext: json['0'].file_ext,
               image_id: json['0'].file_id
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
      var _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
      if(_validFileExtensions.indexOf(this.state.image_ext) === -1){
        var imgsrc = "http://ul.gy/a9O99.png";
        var bbcode = "BBCode Not Valid for this file type";
        var directlink = settings.short_url + this.state.image_name;
      }
      else{
        var imgsrc = settings.short_url + this.state.image_name;
        var bbcode = "[img]"+settings.short_url+this.state.image_name+"[/img]";
        var directlink = settings.short_url + this.state.image_name;
      }
      return (
        <div className="grid-container">
        <Helmet>
          <title>View Image / fileshr.io / File sharing for the masses</title>
        </Helmet>
        <div className="card">
          <div className="card-section">
            <center><img src={imgsrc} /></center>
          </div>
          <div className="card-section">
            <div className="grid-x grid-margin-x">
              <div className="medium-6 cell">
              <label>Direct Link
                <input type="text" disabled='true' value={directlink} />
              </label>
              </div>
              <div className="medium-6 cell">
              <label>Share Link
                <input type="text" disabled='true' value={settings.base_url + 'image/' + this.state.image_id+'/share'} />
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
