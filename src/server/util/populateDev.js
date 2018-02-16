/*
  A development only scrip to populate the database with some sample data in each
  of the tables.
*/

import { createUser } from './user';
import { createDog } from './dog';
// import { createFoster } from './foster';

export default () => {
  createDog({
    chipId: 123456789,
    name: 'Goku',
    litter: 'DBZ',
    fid: null,
    color: 'blue',
    shape: 'circle',
    gender: 'M',
    uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
  }).then((dog) => {
    // eslint-disable-next-line no-console
    console.log(`New dog created with name: ${dog.name}`);
  }).catch(() => {
    // console.log(err);
  });
  createDog({
    chipId: 123456790,
    name: 'Luke',
    litter: 'Star Wars',
    fid: null,
    color: 'red',
    shape: 'triangle',
    gender: 'M',
    uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
  }).then((dog) => {
    // eslint-disable-next-line no-console
    console.log(`New dog created with name: ${dog.name}`);
  }).catch(() => {
    // console.log(err);
  });
  createDog({
    chipId: 123456791,
    name: 'Bulma',
    litter: 'DBZ',
    fid: null,
    color: 'orange',
    shape: 'circle',
    gender: 'F',
    uri: 'https://s3.amazonaws.com/canine-assistants-assets/dogs/o9jaFsXt.jpg',
  }).then((dog) => {
    // eslint-disable-next-line no-console
    console.log(`New dog created with name: ${dog.name}`);
  }).catch(() => {
    // console.log(err);
  });
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
    // eslint-disable-next-line no-console
    console.log(`New user created with email: ${user.email}`);
  }).catch(() => {
    // console.log(err);
  });
  createUser({
    email: 'volunteer@pawgistics.com',
    password: 'password',
    admin: false,
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
    // eslint-disable-next-line no-console
    console.log(`New user created with email: ${user.email}`);
  }).catch(() => {
    // console.log(err);
  });
  // createFoster({
  //   dogs: [123456789],
  //   users: ['BJgXpZObDM'],
  // }).then((foster) => {
  //   // eslint-disable-next-line no-console
  //   console.log(`New user created with fid: ${foster.fid}`);
  //   // eslint-disable-next-line no-console
  //   console.log(`New user created with dogs: ${foster.dogs}`);
  //   // eslint-disable-next-line no-console
  //   console.log(`New user created with users: ${foster.users}`);
  // }).catch(() => {
  //   //
  // });
};
