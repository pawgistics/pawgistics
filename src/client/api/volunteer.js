import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function apiTestVolunteer() {
  return apiCall('GET', '/api/test/volunteer', {});
}
