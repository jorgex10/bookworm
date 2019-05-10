import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SignupForm from '../forms/SignupForm';
import * as actions from '../../actions/users';

class SignupPage extends React.Component {
  submit = (data) => {
    const { signup, history } = this.props;
    signup(data).then(() => history.push('/dashboard'));
  }

  render() {
    return (
      <div>
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
};

export default connect(null, actions)(SignupPage);
