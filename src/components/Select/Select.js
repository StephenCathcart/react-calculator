import PropTypes from 'prop-types';
import React from 'react';
import classes from './Select.module.css';

const select = (props) => (
  <div className={classes.SelectElement}>
    <label className={classes.Label}>{props.label}</label>
    <select
      value={props.value}
      className={classes.Select}
      onChange={props.changed}
      required={props.required}>
      <option></option>
      {props.options.map(option => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  </div>
);

select.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired
};

export default select;