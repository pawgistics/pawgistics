/*
  A development only scrip to populate the database with some sample data in each
  of the tables.
*/

import { createUser } from './user';
// import models from '../models';
//
// const { User } = models;

export default () => {
  createUser({
    email: 'admin@pawgistics.com',
    password: 'password',
    admin: true,
    fname: 'John',
    lname: 'Doe',
    phone: '123-456-7890',
    address: {
      line1: '123 FooBar Rd',
      line2: 'Suite 34',
      city: 'Atlanta',
      state: 'GA',
      zip: '30327',
    },
    uri: 's3://canineassistants/assets/profilepics/*',
  }).then((user) => {
    console.log(`New user created with email: ${user.email}`);
  }).catch(() => {
    // console.log(err);
  });
  createUser({
    email: 'volunteer@pawgistics.com',
    password: 'password',
    admin: true,
    fname: 'Jane',
    lname: 'Doe',
    phone: '123-456-7890',
    address: {
      line1: '123 FooBar Rd',
      line2: 'Suite 34',
      city: 'Atlanta',
      state: 'GA',
      zip: '30327',
    },
    uri: 's3://canineassistants/assets/profilepics/*',
  }).then((user) => {
    console.log(`New user created with email: ${user.email}`);
  }).catch(() => {
    // console.log(err);
  });
};
