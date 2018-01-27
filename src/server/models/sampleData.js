/*
  A development only scrip to populate the database with some sample data in each
  of the tables.
*/
import db from './index';

function populateDev() {
  console.log(db);
  const UserTable = db.userTable;
  const devAdmin = new UserTable({
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
  });
  const devVolunteer = new UserTable({
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
  });
  devAdmin.save((err) => {
    /* eslint no-console: 0 */
    if (err) { return console.log(err); }
    return 0;
  });
  devVolunteer.save((err) => {
    /* eslint no-console: 0 */
    if (err) { return console.log(err); }
    return 0;
  });
}
export default populateDev;
