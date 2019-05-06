import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import PropTypes from 'prop-types';

import InLineError from '../messages/InLineError';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: '',
        password: '',
      },
      loading: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    e.persist();

    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value },
    }));
  }

  onSubmit = () => {
    const { data } = this.state;
    const { submit } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      submit(data).catch(err => this.setState(
        {
          errors: err.response.data.errors,
          loading: false,
        },
      ));
    }
  }

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {errors.global
          && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
          )
        }
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.handleChange}
            />
            {errors.email && <InLineError text={errors.email} />}
          </label>
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Make it secure"
              value={data.password}
              onChange={this.handleChange}
            />
          </label>
        </Form.Field>
        {errors.password && <InLineError text={errors.password} />}
        <Button primary>Login</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
