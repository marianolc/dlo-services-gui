import React from "react";
import "./ErrorMessage.css";

class ErrorMessage extends React.Component {
  render() {
    return (
      <div className="alert alert-danger" role="alert">
        <i className="material-icons">error</i>
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
