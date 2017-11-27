import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
export function checkImagePermissions(user_id, image_id, token) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/image/checkPermissions', {
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
      body: JSON.stringify({
        authorization: token,
        user_id: user_id,
        image_id: image_id
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'test'
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CONTACT_FORM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
};
}
