import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function postDog(props) {
  return apiCall('POST', '/api/dogs', props);
}

export function updateDog(props) {
  return apiCall('POST', `/api/dogs/${props.id}`, props);
}
