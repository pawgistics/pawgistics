import apiCall from '../actions/api';
import {
  dogsApiRoute,
  dogApiRoute,
  usersApiRoute,
  userApiRoute,
  requestsApiRoute,
  REQUESTS_API_ROUTE,
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

export function getRequests(before) {
  return apiCall('GET', requestsApiRoute(before));
}

export function submitRequest(request) {
  return apiCall('POST', REQUESTS_API_ROUTE, request);
}
