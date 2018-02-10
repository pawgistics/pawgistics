import dynamoose from 'dynamoose';

const FosterSchema = new dynamoose.Schema({
  fid: {
    type: String,
    required: true,
    hashKey: true,
  },
  dogs: {
    type: [String],
    required: true,
  },
  users: {
    type: [String],
    required: true,
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
});

const Foster = dynamoose.model('Foster', FosterSchema);

export default Foster;
