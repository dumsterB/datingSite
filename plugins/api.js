export async function load(uri, method, data, auth = false){
  const token = localStorage.getItem('token');
  let headers = {};
  const params = {method, headers}

  if (data instanceof FormData) {
    params.body = data;
  } else if(method.includes('post') || method.includes('put') || method.includes('patch')){
    params.headers = {'Content-Type': 'application/json'};
    params.body = Object.keys(data).length ? JSON.stringify(data) : null;
  }

  if (auth && token) {
    params.headers['Authorization'] = 'Bearer ' + token;
  }

  //return fetch(`https://${process.env.API_HOST}${uri}`, params).then(res => res.json())

  let response = await fetch(`https://${process.env.API_HOST}${uri}`, params);
  if (response.status !== 200) {
    let { err } = await response.json()
    console.log(err)
    throw new Error(err.msg);
  }
  return await response.json();
}

