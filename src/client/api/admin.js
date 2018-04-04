import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function postDog(dog) {
  return apiCall('POST', '/api/dogs', dog);
}

export function updateDog(dog) {
  return apiCall('POST', `/api/dogs/${dog.id}`, dog);
}
