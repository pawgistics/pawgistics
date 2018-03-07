// @flow

import { connect } from 'react-redux';

import MessageAsync from '../components/message';

const mapStateToProps = state => ({
  message: state.hello.messageAsync,
});

export default connect(mapStateToProps)(MessageAsync);
