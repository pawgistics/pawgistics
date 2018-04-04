// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  isAdmin: boolean,
  children: React.Node,
}

const AdminControl = ({ isAdmin, children }: Props) => (isAdmin ? children : null);

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(AdminControl);
