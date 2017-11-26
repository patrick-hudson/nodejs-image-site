import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { facebookLogin, twitterLogin, googleLogin, vkLogin, githubLogin } from '../../actions/oauth';
//import { getAccount } from '../../actions/gallery';
import { instanceOf } from 'prop-types';
import Cookies from 'universal-cookie';
import Messages from '../Messages';
import copy from 'copy-to-clipboard';
var crypto = require('crypto');
crypto.randomBytes(4, function(err, buffer) {
  var random = buffer.toString('hex');
});
class Gallery extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    //this.props.dispatch(getAccount(1));
    this.state = {
      data: null,
      totalCount: '0',
      loading: 'true',
      currentPage: '1',
      nextPage: '2'
      };
  }

  componentDidMount() {
    let page = this.props.location.query.page;
    if (page == null) {
      page = 1;
    }
    var nPage = parseInt(page)+1;
    const cookies = new Cookies();
    var token = cookies.get('token');
    fetch('/gallery/list.json/'+page, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {

        return response.json().then((json) => {
          var jsonTest = JSON.stringify(json);
          var jsonTest = JSON.parse(jsonTest);
          for (var key in jsonTest) {
            if(jsonTest[key].total_count != null){
              var totalCount = jsonTest[key].total_count;
              delete jsonTest[key]
            }
          }
          this.setState({
            data: jsonTest,
            totalCount: totalCount,
            loading: 'false',
            currentPage: page,
            nextPage: nPage
          })
        });
      } else {
        return response.json().then((json) => {
          console.log(json)
        });
      }
    });

  }

handleChange(event) {
  //console.log(this);
  console.log(event);
  //var nTarget = event.target;
  //var nTarget = nTarget.toString();
  //console.log(nTarget);
  //console.log(/data[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(nTarget)[1]);
  //console.log(nTarget.match(/data=\"(.*?)\"/[1]));
  var url = "http://ul.gy/"+event;
  copy(url);
  dispatch({
    type: 'COPIED_SUCCESS',
    messages: [json]
  });
}

randomValueHex (len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,len);   // return required number of characters
}

  render() {
    var page = '';
    if (this.props.location.query.page == null) {
      page = 1;
    } else {
      page = this.props.location.query.page
    }
    var nPage=0;
    var pPage = parseInt(page)-1;
    if (pPage >= 1) {
      pPage = parseInt(page)-1;
      //console.log(pPage);
      //console.log(page);
    } else {
      pPage = 1;
    }
    let content;
    let pageInation = '';
    var pageArray = [];
    if (this.state.loading == 'false' && this.state.data) {
      var pageCount = this.state.totalCount;
      var pageCount = pageCount / 20;
      var pageCount = Math.ceil(pageCount);
      var nPage = parseInt(page)+1;
      if (nPage >= pageCount) {
        console.log('bigger');
        console.log(nPage);
        console.log(pageCount);
        nPage  = pageCount;
      } else {
        var nPage = parseInt(page)+1;
        console.log(nPage);
        console.log(page);
      }
      for (var i = 1, len = pageCount; i <= len; i++) {
        pageArray.push(i)
      }
      content = Object.keys(this.state.data).map(key => {
       var random = this.randomValueHex(4);
       var random = this.randomValueHex(4);
       var imgsrc = "http://ul.gy/" + this.state.data[key].file_id + this.state.data[key].file_ext;
       return (
       <div key={this.randomValueHex(4)} className="cell clearfix">
       <div key={this.randomValueHex(4)} className="callout" data-equalizer-watch="">
       <a href="#" id='copy' className="left" data={this.state.data[key].file_id.toString() + this.state.data[key].file_ext.toString()} onClick={() => this.handleChange( this.state.data[key].file_id.toString() + this.state.data[key].file_ext.toString())}><i className="fi-clipboard">&nbsp;</i></a>
       <a href={imgsrc} className="right"><i className="fi-link">&nbsp;</i></a>
       <img key={this.randomValueHex(4)} className="thumbnail" src={imgsrc} />
       <div key={this.randomValueHex(4)} className="cell">
       <a href="" className="button alert tiny">Manage Image</a>
       </div>
       </div>
       </div>
     );
    })
    } else {
      pageInation = "";
      content = <div>boobs</div>; // whatever you want it to be while waiting for data
    }
    return (

<div className="grid-container fluid">
      <div key="test" id="main-row" data-equalizer data-equalize-on="medium" className="grid-x grid-padding-x small-up-2 medium-up-6 large-up-8">

          {content}
</div>
<div>
      <title>Gallery</title>
      </div>
      <div className="grid-container fluid">
      <div key="pageDiv" className="grid-x grid-padding-x">
      <div className="cell">
      <ul className="pagination text-center" role="navigation" aria-label="Pagination">
        <li className="pagination-previous"><a href={"/gallery?page=" + pPage}>Previous</a></li>
        <li className="current"><span classNames="show-for-sr">Youre on page</span> {page}</li>
        {pageArray.map(function(number, index){
          var hrefsrc = "/gallery?page=" + number;
          var arialabel = "Page " + i;
          return <li key={index}><a href={hrefsrc}>{number}</a></li>
        })}
        <li className="pagination-next"><a href={"/gallery?page=" + nPage}>Next</a></li>
      </ul>
</div></div></div></div>
    );
  }


}
const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Gallery);