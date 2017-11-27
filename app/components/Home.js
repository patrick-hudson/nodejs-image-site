import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import {Helmet} from "react-helmet";

class Home extends React.Component {
  render() {
    return (
      <div className="grid-container fluid">
      <Helmet>
        <title>(coming soon) Home / fileshr.io / File sharing for the masses</title>
      </Helmet>
        <div key="pageDiv" className="grid-x grid-padding-x callout secondary">
          <div className="cell">
            <Messages messages={this.props.messages}/>
            <h3>Oh Hai</h3>
            <p>You have sadly come too early. Public beta soon.</p>
            </div>
            </div>
        </div>
      );
    }
  }

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
