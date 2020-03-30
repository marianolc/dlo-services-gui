import React from "react";
import {
  TextField,
  InputAdornment
} from "@material-ui/core";

export const FilterText = (props) => {
  const {
    fieldName, description, placeholder, value, handleChange, handleBlur, errors, touched, className, readOnly
  } = props;
  const inputProps = readOnly ? { readOnly: true } : {};
  const fieldTouched = touched && touched[fieldName];
  const error = errors && errors[fieldName] && fieldTouched;
  return (
    <TextField
      id={fieldName}
      className={className}
      label={description}
      placeholder={placeholder}
      defaultValue={value}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={inputProps}
      error={error}
      helperText={error ? errors[fieldName] : ''}
    />);
};

export const FormText = (props) => {
  const {
    fieldName, description, placeholder, value, handleChange, handleBlur, type, error, touched, readOnly
  } = props;
  const inputProps = readOnly ? { readOnly: true } : {};
  const hasError = error && touched;
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
      error={hasError}
      helperText={hasError ? error : ''}
      type={!type ? null : type}
    />);
}

export const FormTextWithIcon = (props) => {
  const {
    fieldName, description, placeholder, value, handleChange, handleBlur, type, errors, touched, readOnly
  } = props;
    const inputProps = readOnly ? { readOnly: true } : {};
  const fieldTouched = touched && touched[fieldName];
  const error = errors && errors[fieldName] && fieldTouched;
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
