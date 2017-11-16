import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';


export function uploadfile(files) {
  //var form = document.getElementById("myForm");
  var formData = new FormData();
  //formData.append('files', files);
  $.each(files, function(key, value) {
      formData.append('files' + key, value);
      console.log(key + " " + value);
  });
  //data.append('user', 'guestUser');
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/upload', {
      method: 'post',
      body: formData
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'UPLOAD_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'UPLOAD_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
