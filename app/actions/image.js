/*!
* nodejs-image-site
*
*
*
* Node.js / Express.js / React.js
*
* LICENSE: MIT
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* author     Patrick Hudson <phudson2@gmail.com>
* copyright  2017 Patrick Hudson
* license    https://opensource.org/licenses/MIT MIT
* version    GIT: 1.0
*/

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
