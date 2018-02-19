import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function apiTestAdmin() {
  return apiCall('GET', '/api/test/admin', {});
}

export function postDog(props) {
  return apiCall('POST', '/api/dogs/new/dog', props);
}
