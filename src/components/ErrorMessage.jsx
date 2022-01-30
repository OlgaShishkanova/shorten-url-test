/* eslint no-unused-vars: 1 */

import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({validationError}) => (
       <>{validationError &&
        <div className="error-message" data-testid="error-message">{validationError}</div>
    }</>
    );

export default ErrorMessage;

ErrorMessage.propTypes = {
    validationError: PropTypes.string
  };

  ErrorMessage.defaultProps = {
    validationError: ''
  }