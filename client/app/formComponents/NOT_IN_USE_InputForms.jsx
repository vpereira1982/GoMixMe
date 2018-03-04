import React from "react";
import ReactDOM from "react-dom";

export const TextInput = (
  name,
  type,
  placeholder,
  handlerFunc,
  value,
  style = "",
  required = false
  ) => (
    <input
      type={`${type}`}
      name={`${name}`}
      className="form-control form-control-lg"
      placeholder={`${placeholder}`}
      onChange={handlerFunc}
      value={`${value}`}
      required={`${required}`}
      style={{ style }}
    />
  )

