import React from "react";
import { Button } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Formik } from "formik";
import { withStyles } from "@material-ui/core/styles";
import _ from 'lodash';

import { formContainerStyles as styles } from "./Styles";
import { FilterText } from './FormImputs';
import translated from '../shared/Translated';

class FilterContainer extends React.Component {

  render() {
    const { classes } = this.props;
    const initialValues = {};
    this.props.fields.map(
      f => initialValues[f.field] = f.value
    )

    return (
      <div className={classes.titleElement}>
        <Formik
          initialValues={initialValues}
          onSubmit={data => {
            const filtered = _.pickBy(data, _.identity);
            this.props.onFilter(filtered);
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
                  this.props.fields.map(
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
}

export default withStyles(styles)(FilterContainer);
