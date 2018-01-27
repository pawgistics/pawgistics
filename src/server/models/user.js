import argon2 from 'argon2';
import dynamoose from 'dynamoose';

const User = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    // validate: (v => /* placeholder for an email regex */ v === v),
    required: true,
    trim: true,
    index: {
      global: true,
      rangeKey: 'fname',
      throughput: 1,
    },
  },
  password: {
    type: String,
    required: true,
    set: (pw => argon2.hash(pw, { type: argon2.argon2id })),
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: RegExp('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
  },
  address: {
    type: Object,
    required: true,
  },
  uri: {
    type: String,
  },
  fid: {
    type: Number,
  },
});

export default User;
