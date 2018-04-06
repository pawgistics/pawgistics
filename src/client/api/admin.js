import apiCall from '../actions/api';
import { DOGS_API_ROUTE, dogApiRoute } from '../routes';

// eslint-disable-next-line import/prefer-default-export
export function postDog(dog) {
  return apiCall('POST', DOGS_API_ROUTE, dog);
}

export function updateDog(dog) {
  return apiCall('POST', dogApiRoute(dog.id), dog);
}
