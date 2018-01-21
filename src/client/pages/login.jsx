// @flow

import React from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import PropTypes from 'prop-types';

import { loginUser } from '../actions/login';
import styles from '../styles/pages/login.m.scss';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(variable) {
    return (event) => {
      const update = {};
      update[variable] = event.target.value;
      this.setState(update);
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.handleLogin({
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div styleName="login-wrapper">
        <Form styleName="login" onSubmit={this.handleSubmit}>
          <div className="text-center mb-4">
            <img className="mb-4" src="/static/img/canine-assistants.svg" width="390" alt="Canine Assistants" />
          </div>

          {this.props.errMsg && <div className="mb-2 text-danger">{this.props.errMsg}</div>}

          <div styleName="label-group">
            <Input
              type="email"
              name="email"
              id="inputEmail"
              placeholder="Email address"
              value={this.state.email}
              onChange={this.handleChange('email')}
              disabled={this.props.isFetching}
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
              disabled={this.props.isFetching}
              required
            />
            <Label for="inputPassword">Password</Label>
          </div>
          <FormGroup check className="mb-3">
            <Label check>
              <Input type="checkbox" value="remember-me" disabled={this.props.isFetching} /> Remember me
            </Label>
          </FormGroup>
          <Button
            color="primary"
            size="lg"
            block
            disabled={this.props.isFetching}
            {...(this.props.isFetching ? { className: 'progress-bar-striped progress-bar-animated' } : {})}
          >Login
          </Button>
          <p className="mt-5 mb-3 text-muted text-center">&copy; 2018</p>
        </Form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errMsg: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFetching: state.auth.get('isFetching'),
  errMsg: state.auth.get('errMsg'),
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (creds) => { dispatch(loginUser(creds)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(LoginPage, styles));
