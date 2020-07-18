import React from 'react';
import styles from './FormItemValidation.module.css';
import PropTypes from 'prop-types';

const FormItemValidation = (props) => {
  let itemValidationText = props.value ? 'Valid' : 'Invalid';
  let itemValidationStyle = props.value
    ? styles.ValidInput
    : styles.InvalidInput;
  return (
    <span
      className={itemValidationStyle}
    >{`${itemValidationText} ${props.itemType}`}</span>
  );
};

FormItemValidation.propTypes = {
  value: PropTypes.bool,
  itemType: PropTypes.string,
};

export default FormItemValidation;
