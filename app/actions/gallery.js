import React from 'react';
import { connect } from 'react-redux'
import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
var request = require('request');
import { getUserRecords } from '../../controllers/gallery'
export function getAccount(pageNumber) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    fetch('/gallery/list.json/'+pageNumber)
    .then(results => {
      console.log(results);
    })
}
}
