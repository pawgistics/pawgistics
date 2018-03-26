// @flow

import React from 'react';
import { Redirect } from 'react-router';
// import { connect } from 'react-redux';

import { DOG_MANAGEMENT_PAGE_ROUTE } from '../../shared/routes';

// type Props = {
//   isAdmin: boolean,
// }

const HomePage = (/* { isAdmin }: Props */) => (
  <Redirect to={DOG_MANAGEMENT_PAGE_ROUTE} />
);

// const mapStateToProps = state => ({
//   isAdmin: state.auth.isAdmin,
// });
//
// export default connect(mapStateToProps)(HomePage);

export default HomePage;
