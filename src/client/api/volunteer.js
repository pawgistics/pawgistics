import apiCall from '../actions/api';
import {
  dogsApiRoute,
  dogApiRoute,
  usersApiRoute,
  userApiRoute,
  INSTRUCTORS_API_ROUTE,
} from '../routes';

export function getDogs(filters) {
  return apiCall('GET', dogsApiRoute(filters));
}

export function getDog(id) {
  return apiCall('GET', dogApiRoute(id));
}

export function getUsers(filters) {
  return apiCall('GET', usersApiRoute(filters));
}

export function getUser(id) {
  return apiCall('GET', userApiRoute(id));
}

export function getInstructors() {
  return apiCall('GET', INSTRUCTORS_API_ROUTE);
}

export function getLitters() {
  return apiCall('GET', '/api/litters');
}
export function submitCheckout(request) {
  return apiCall('POST', '/api/checkouts', request);
}
