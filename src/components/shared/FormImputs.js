import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";

export const FilterText = (props) => {
  const {
    fieldName,
    description,
    placeholder,
    value,
    handleChange,
    handleBlur,
    errors,
    touched,
    className,
    readOnly,
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
      helperText={error ? errors[fieldName] : ""}
    />
  );
};

export const FormText = ({
  fieldName,
  description,
  values,
  placeholder,
  handleChange,
  handleBlur,
  type,
  errors,
  touched,
  isRead,
  value,
  select,
  children,
}) => {
  const inputProps = isRead ? { readOnly: true } : {};
  const error = errors && errors[fieldName];
  const touchedField = touched && touched[fieldName];
  const hasError = error && touchedField;
  return (
    <TextField
      id={fieldName}
      label={description}
      fullWidth
      placeholder={placeholder}
      defaultValue={value || values[fieldName]}
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={inputProps}
      error={hasError}
      helperText={hasError && error}
      type={type}
      select={select}>
      {children}
    </TextField>
  );
};

export const FormTextWithIcon = ({
  fieldName,
  description,
  placeholder,
  values,
  handleChange,
  handleBlur,
  type,
  errors,
  touched,
  readOnly,
  value,
  icon,
}) => {
  const inputProps = readOnly ? { readOnly: true } : {};
  const fieldTouched = touched && touched[fieldName];
  const error = errors && errors[fieldName] && fieldTouched;
  return (
    <TextField
      id={fieldName}
      label={description}
      fullWidth
      placeholder={placeholder}
      defaultValue={value || values[fieldName]}
      onChange={handleChange}
      onBlur={handleBlur}
      InputProps={{
        ...inputProps,
        startAdornment: (
          <InputAdornment position='start'>{icon}</InputAdornment>
        ),
      }}
      error={error}
      helperText={error ? errors[fieldName] : ""}
      type={!type ? null : type}
    />
  );
};
