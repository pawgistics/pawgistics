import apiCall from '../actions/api';
import { DOGS_API_ROUTE, USERS_API_ROUTE, dogApiRoute, userApiRoute } from '../routes';

export function createDog(dog) {
  return apiCall('POST', DOGS_API_ROUTE, dog);
}

export function updateDog(id, dog) {
  return apiCall('PUT', dogApiRoute(id), dog);
}

export function removeDog(id) {
  return apiCall('DELETE', dogApiRoute(id));
}

export function createUser(dog) {
  return apiCall('POST', USERS_API_ROUTE, dog);
}

export function updateUser(id, user) {
  return apiCall('PUT', userApiRoute(id), user);
}

export function removeUser(id) {
  return apiCall('DELETE', userApiRoute(id));
}
