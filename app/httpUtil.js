import { httpBase } from './httpBaseUtil';

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};

export function fetch(endpoint, params, headers) {
  return httpBase().get(`/${endpoint}`, { params, headers });
}

export function store(endpoint, data) {
  return httpBase().post(`/${endpoint}`, data);
}

export function update(endpoint, data) {
  return httpBase().put(`/${endpoint}`, data);
}

export function destroy(endpoint, payload) {
  if (payload) {
    return httpBase().delete(`/${endpoint}`, { data: payload });
  } else {
    return httpBase().delete(`/${endpoint}`);
  }
}

export function download(endpoint, params) {
  return httpBase(true).get(`/${endpoint}`, { params });
}

export function downloadFile(endpoint, data) {
  return httpBase(true).post(`/${endpoint}`, data);
}

export function uploadFile(endpoint, data, headers) {
  headers && (config.headers.acceptType = headers.acceptType);
  return httpBase().post(`/${endpoint}`, data, config);
}
