import dynamoose from 'dynamoose';

const UserSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    set: (s => s.toLowerCase()),
    index: {
      global: true,
      throughput: 1,
    },
  },
  password: {
    type: String,
    required: true,
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
    type: String,
    index: {
      global: true,
    },
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
});

const User = dynamoose.model('User', UserSchema);

export default User;
