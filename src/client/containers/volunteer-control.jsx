// @flow

import React from 'react';
import { connect } from 'react-redux';

type Props = {
  isAdmin: boolean,
  children: React.Node,
}

const VolunteerControl = ({ isAdmin, children }: Props) => (isAdmin ? null : children);

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
});

export default connect(mapStateToProps)(VolunteerControl);
