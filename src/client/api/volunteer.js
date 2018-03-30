import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function getDogs() {
  return apiCall('GET', '/api/dogs', null);
}

export function getDog(id) {
  return apiCall('GET', `/api/dogs/${id}`, null);
}

export function getUsers() {
  return apiCall('GET', '/api/users', null);
}

export function getUser(id) {
  return apiCall('GET', `/api/users/${id}`, null);
}

export function getAdmins() {
  return apiCall('GET', '/api/users/admin', null);
}

export function getLitters() {
  return apiCall('GET', '/api/litters', null);
}
