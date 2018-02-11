import dynamoose from 'dynamoose';

const DogSchema = new dynamoose.Schema({
  chipId: {
    type: Number,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  litter: {
    type: String,
    required: true,
    index: {
      global: true,
      rangeKey: 'name',
      throughput: 1,
    },
  },
  fid: {
    type: String,
  },
  color: {
    type: String,
    required: true,
  },
  shape: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    validate: RegExp('M|F'),
  },
  uri: {
    type: String,
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
});

const Dog = dynamoose.model('Dog', DogSchema);

export default Dog;
