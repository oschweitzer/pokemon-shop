import React from 'react';
import styles from './FormItem.module.css';
import FormItemValidation from '../FormItemValidation/FormItemValidation';
import PropTypes from 'prop-types';

const FormItem = (props) => {
  return (
    <div className={styles.FormItem}>
      <div className={styles.Row}>
        <label htmlFor={props.itemType}>{props.label}</label>
        <input
          id={props.itemType}
          type={props.itemType}
          onInput={(event) => props.onInputHandler(event.target.value)}
        />
      </div>
      {props.value ? (
        <FormItemValidation
          value={props.isValueValid}
          itemType={props.itemType}
        />
      ) : (
        <span className={styles.Hidden}>Validation</span>
      )}
    </div>
  );
};

FormItem.propTypes = {
  itemType: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  isValueValid: PropTypes.bool,
  onInputHandler: PropTypes.func,
};

export default FormItem;
