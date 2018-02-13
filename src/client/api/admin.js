import apiCall from '../actions/api';

// eslint-disable-next-line import/prefer-default-export
export function apiTestAdmin() {
  return apiCall('GET', '/api/test/admin', {});
}
