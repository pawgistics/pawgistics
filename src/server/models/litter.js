import dynamoose from 'dynamoose';

const LitterSchema = new dynamoose.Schema({
  name: {
    type: String,
    hashKey: true,
  },
}, {
  useNativeBooleans: true,
  useDocumentTypes: true,
});

const Litter = dynamoose.model('Litter', LitterSchema);

export default Litter;
