import React from "react";
import {
  TextField,
  InputAdornment
} from "@material-ui/core";

export const FormText = (props) => {
  const {
    fieldName, description, placeholder, value, handleChange, handleBlur, type, errors, touched, inputProps
  } = props;
  const fieldTouched = touched[fieldName];
  const error = errors[fieldName] && fieldTouched;
  return (
    <TextField
      id={fieldName}
      label={description}
      fullWidth
      placeholder={placeholder}
      defaultValue={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={inputProps}
      error={error}
      helperText={error ? errors[fieldName] : ''}
      type={!type ? null : type}
    />);
}

export const FormTextWithIcon = (props) => {
  const {
    fieldName, description, placeholder, value, handleChange, handleBlur, type, errors, touched, inputProps
  } = props;
  const fieldTouched = touched[fieldName];
  const error = errors[fieldName] && fieldTouched;
  return (<TextField
    id={fieldName}
    label={description}
    fullWidth
    placeholder={placeholder}
    defaultValue={value}
    onChange={handleChange}
    onBlur={handleBlur}
    InputProps={{
      ...inputProps,
      startAdornment: (
        <InputAdornment position="start">
          {props.icon}
        </InputAdornment>
      )
    }}
    error={error}
    helperText={error ? errors[fieldName] : ''}
    type={!type ? null : type}
  />);
}