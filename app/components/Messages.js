import React from 'react';

class Messages extends React.Component {
  render() {
    return this.props.messages.success ? (
      <div role="alert" className="callout success" data-closable>
        {this.props.messages.success.map((message, index) => <div key={index}>{message.msg}</div>)}
        <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    ) : this.props.messages.error ? (
      <div role="alert" className="callout alert" data-closable>
        {this.props.messages.error.map((message, index) => <div key={index}>{message.msg}</div>)}
        <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    ) : this.props.messages.info ? (
      <div role="alert" className="callout primary" data-closable>
        {this.props.messages.info.map((message, index) => <div key={index}>{message.msg}</div>)}
        <button className="close-button" aria-label="Dismiss alert" type="button" data-close>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    ) : null;
  }
}

export default Messages;
