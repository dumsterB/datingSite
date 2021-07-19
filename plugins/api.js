export async function load(uri, method, data, auth = false){
  const token = localStorage.getItem('token');
  let headers = {};
  const params = {method, headers}

  if (data instanceof FormData) {
    params.body = data;
  } else if(method.includes('post')){
    params.headers = {'Content-Type': 'application/json'};
    params.body = Object.keys(data).length ? JSON.stringify(data) : null;
  }

  if (auth && token) {
    params.headers['Authorization'] = 'Bearer ' + token;
  }

  return fetch(`https://${process.env.API_HOST}${uri}`, params).then(res => res.json())
}

