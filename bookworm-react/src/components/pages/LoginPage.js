import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

import LoginForm from '../forms/LoginForm';

class LoginPage extends React.Component {
  submit = (data) => {
    const { login, history } = this.props;
    return login(data).then(() => history.push('/dashboard'));
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <LoginForm submit={this.submit} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, actions)(LoginPage);
