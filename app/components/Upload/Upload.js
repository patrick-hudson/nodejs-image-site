import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { uploadfile } from '../../actions/upload';
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
import Messages from '../Messages';
import {Helmet} from "react-helmet";

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', fileupload: '' };
  }

  handleChange(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    this.setState({ [event.target.name]: event.target.value });
  }

  handleUpload(event) {
    event.preventDefault();
    this.props.dispatch(uploadfile(this.state.fileupload));

  }

  render() {
    return (
      <div className="grid-container fluid">
      <Helmet>
        <title>(coming soon) Upload Files / fileshr.io / File sharing for the masses</title>
      </Helmet>
          <Messages messages={this.props.messages}/>
          <div className="alert callout" data-closable="" id="error" role="alertdialog" style={{display: "none"}}>
            <button tabIndex="0" className="close-button" aria-label="Close Alert" data-close="">&times;</button>
          </div>

            <div id="actions" className="grid-x grid-padding-x small-up-2 medium-up-3">
              <div className="cell">
              <center>
                    <span className="button secondary fileinput-button dz-clickable">
                        <i className="fi-plus">&nbsp;</i>
                        Add files...
                    </span>
              </center>
              </div>
              <div className="cell">
              <center>
                    <button type="submit" className="button success start">
                        <span><i className="fi-upload">&nbsp;</i>
                        Start upload</span>
                    </button>
             </center>
             </div>
             <div className="cell">
             <center>
                    <button type="reset" className="button alert cancel">
                        <span><i className="fi-x-circle">&nbsp;</i>
                        Cancel upload</span>
                    </button>
             </center>
             </div>
             <div id="drop" className="grid-x grid-padding-x">
              <div className="files" id="previews" style={{visibility: "hidden"}}>
                <div id="template" className="file-row">
                <table style={{tableLayout: "fixed", width: "85%"}}>
                  <thead>
                    <tr>
                      <th width="25%">Preview</th>
                      <th width="25%">File Name</th>
                      <th width="25%">File Size</th>
                      <th width="25%">Status</th>
                      <th width="25%">Controls</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                  <td>
                    <span id="preview" className="preview"></span>
                  </td>
                <td style={{wordWrap: "break-word"}}>
                <span id="filename-tip" data-tooltip aria-haspopup="true" className="has-tip top" data-disable-hover="false" tabIndex="2">Hover to View</span>
                </td>
                <td>

                    <p className="size" data-dz-size></p>

                </td>
                <td>
                    <div className="progress" role="progressbar">
                      <div id="single-progress" className="progress-meter" style={{width:'0%'}} data-dz-uploadprogress>
                      <p id="progressText" className="progress-meter-text"></p>
                      </div>

                    </div>
                </td>
                <td>
                  <button className="button tiny start">
                      <i className="fi-upload">&nbsp;</i>
                      <span>Start</span>
                  </button>
                  <a className="dz-remove button tiny alert delete" href="javascript:undefined;" data-dz-remove=""><i className="fi-trash">&nbsp;</i>Remove file</a>
                </td>
                </tr>
                </tbody>
                </table>
                </div>
              </div>

              <span className="fileupload-process">
                <div id="total-progress-div" role="progressbar" className="progress" style={{opacity:'0'}}>
                  <div id="total-progress" className="progress-meter" style={{width:'0%', opacity:'0'}} data-dz-totaluploadprogress>
                  <p id="progressTextTotal" className="progress-meter-text">0%</p>
                  </div>
                </div>
              </span>

          </div>
                      </div>
          <title>Upload</title>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Upload);
