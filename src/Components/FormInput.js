import React, { Component } from "react";

export default class FromInput extends Component {
  render() {
    const { label, handleChange, errorMessage, ...inputProps } = this.props;
    return (
      <div className="col-6 mb-3">
        <label>{label}</label>
        <input className="w-100 mt-1"  {...inputProps} onChange={handleChange}/>
        <span className="text text-danger">{errorMessage}</span>
      </div>
    );
  }
}
