import { Auth } from "aws-amplify";
import { stringify as urlStringify } from 'query-string';
import { HTTP_CLIENT_ERROR } from '../../consts/api-endpoints';

async function setAuthToken(headers) {
  try {
    headers['Authorization'] = await (await Auth.currentSession()).getAccessToken().getJwtToken();
  } catch(err) {}
} 

async function fetchCall(url, config) {
  try {
    // default headers
    const commonHeaders = {
      'Content-Type': 'application/json',
    };
    config.headers = Object.assign(commonHeaders, config.headers);
    await setAuthToken(config.headers);

    const response = await fetch(url, config);
    return { response: await response.json(), status: response.status };
  } catch (err) {
    return { response: err, status: HTTP_CLIENT_ERROR };
  }
}

export async function get(url, params = {}, headers = {}) {
  const urlParms = urlStringify(params);
  const preparedUrl = `${url}?${urlParms}`;
  return await fetchCall(preparedUrl, { headers });
}

export async function post(url, data, headers = {}) {
  return await fetchCall(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });
}

export async function put(url, data, headers = {}) {
  return await fetchCall(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });
}

export async function del(url, headers = {}) {
  return await fetchCall(url, {
    method: 'DELETE',
    headers,
  });
}
