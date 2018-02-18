import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function apiTestVolunteer() {
  return apiCall('GET', '/api/test/volunteer', {});
}

export function getDogs() {
  return apiCall('GET', '/api/dogs/', null);
}

export function getDog(chipId) {
  return apiCall('GET', `/api/dogs/${chipId}`, null);
}
