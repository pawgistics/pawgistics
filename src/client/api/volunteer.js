import apiCall from '../actions/api';
import {
  dogsApiRoute,
  dogApiRoute,
  usersApiRoute,
  userApiRoute,
  INSTRUCTORS_API_ROUTE,
} from '../routes';

// eslint-disable-next-line import/prefer-default-export
export function getDogs(filters) {
  return apiCall('GET', dogsApiRoute(filters), null);
}

export function getDog(id) {
  return apiCall('GET', dogApiRoute(id), null);
}

export function getUsers(filters) {
  return apiCall('GET', usersApiRoute(filters), null);
}

export function getUser(id) {
  return apiCall('GET', userApiRoute(id), null);
}

export function getInstructors() {
  return apiCall('GET', INSTRUCTORS_API_ROUTE, null);
}

export function getLitters() {
  return apiCall('GET', '/api/litters', null);
}
