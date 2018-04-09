// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Form, /* FormGroup, */ Input, Button, Label } from 'reactstrap';
// import PropTypes from 'prop-types';

import { loginUser } from '../actions/auth';
import '../styles/pages/login.m.scss';

type Props = {
  loginUser: ({ email: string, password: string }) => Promise,
}

class LoginPage extends React.Component<Props> {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errMsg: null,
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(variable) {
    return (event) => {
      const update = {};
      update[variable] = event.target.value;
      this.setState(update);
    };
  }

  handleLogin(event) {
    event.preventDefault();

    this.setState({ loading: true });

    this.props.loginUser({
      email: this.state.email,
      password: this.state.password,
    }).catch((errMsg) => {
      this.setState({
        loading: false,
        errMsg,
      });
    });
  }

  render() {
    return (
      <div styleName="login-wrapper">
        <Form styleName="login" onSubmit={this.handleLogin}>
          <div className="text-center mb-4">
            <img styleName="banner" className="mb-4 mx-0" src="/static/img/canine-assistants.svg" alt="Canine Assistants" />
          </div>

          {this.state.errMsg && <div className="mb-2 text-danger">{this.state.errMsg}</div>}

          <div styleName="label-group">
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.handleChange('email')}
              disabled={this.state.loading}
              autoFocus
              required
            />
            <Label for="inputEmail">Email address</Label>
          </div>

          <div styleName="label-group">
            <Input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange('password')}
              disabled={this.state.loading}
              required
            />
            <Label for="inputPassword">Password</Label>
          </div>
          {/* <FormGroup check className="mb-3">
            <Label check>
            <Input type="checkbox" value="remember-me" disabled={this.state.loading} /> Remember me
            </Label>
          </FormGroup> */}
          <Button
            color="primary"
            size="lg"
            block
            disabled={this.state.loading}
            className="mt-5"
            {...(this.state.loading ? { className: 'progress-bar-striped progress-bar-animated' } : {})}
          >Login
          </Button>
          {/* <p className="mt-5 mb-3 text-muted text-center">&copy; 2018</p> */}
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({ loginUser: creds => dispatch(loginUser(creds)) });

export default connect(null, mapDispatchToProps)(LoginPage);
