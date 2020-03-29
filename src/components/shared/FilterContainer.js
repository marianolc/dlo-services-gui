import React from "react";
import { Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Formik } from "formik";
import { useStyles } from './Styles';
import _ from 'lodash';
import { FilterText } from './FormImputs';
import translated from '../shared/Translated';

const FilterContainer = (props) => {
  const classes = useStyles();
  const initialValues = {};

  const values = props.fields.map(
    f => initialValues[f.field] = f.value
  );

  return (
    <div className={classes.titleElement}>
      <Formik
        initialValues={initialValues}
        onSubmit={data => {
          const filtered = _.pickBy(data, _.identity);
          props.onFilter(filtered);
        }}
        validate={
          values => {
          }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
            <form autoComplete="off" onSubmit={handleSubmit}>
              {
                props.fields.map(
                  f => (<FilterText
                    key={f.field}
                    fieldName={f.field}
                    description={f.title}
                    value={values[f.field]}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    className={classes.filterImput}
                  />
                  )
                )
              }
              <Button
                color="secondary"
                className={classes.button}
                startIcon={<FilterListIcon />}
                type="submit"
              >
                {translated('layout.filter')}
              </Button>
            </form>
          )
        }
      </Formik>
    </div>
  );
}

export default FilterContainer;
