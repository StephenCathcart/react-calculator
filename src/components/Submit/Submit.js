import PropTypes from 'prop-types';
import React from 'react';
import classes from './Submit.module.css';

const submit = (props) => (
  <input className={classes.Submit} type="submit" value={props.value} disabled={props.disabled} />
);

submit.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default submit;