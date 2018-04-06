// @flow

import React from 'react';
import { Redirect } from 'react-router';
// import { connect } from 'react-redux';

import { DOGS_PAGE_ROUTE } from '../routes';

// type Props = {
//   isAdmin: boolean,
// }

const HomePage = (/* { isAdmin }: Props */) => (
  <Redirect to={DOGS_PAGE_ROUTE} />
);

// const mapStateToProps = state => ({
//   isAdmin: state.auth.isAdmin,
// });
//
// export default connect(mapStateToProps)(HomePage);

export default HomePage;
