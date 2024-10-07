import axios,  { AxiosResponse, Method }  from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const getApiUrl = (path, query = null) => {

  let queryString = '';

  if(query){
    Object.keys(query).map( (k, i) => {
      queryString += (i === 0)?'?':'&';
      queryString += `${k}=${query[k]}`
    })
  }

  return `${path}${queryString}`
};

type IProps = {
  data?: any,
  files? : any,
  query?: any,
  cache?: any,
  onUploadProgress?: any,
  bearerToken?: any
}

const ApiEngine = (method : Method, path : string,
                   { data, files, query, cache, onUploadProgress, bearerToken
                   }: IProps = {}
                   ): Promise<AxiosResponse>  => {
  const content = {
    method,
    url: getApiUrl(path, query),
    withCredentials: true
  };

  const headers = {};
  const config = {};
  const credentials = {};
  if (cache) {
    Object.assign(headers, { 'Cache-Control': 'no-cache' });
    Object.assign(config, {
      adapter: cacheAdapterEnhancer(axios.defaults.adapter, (true as any))
    })
  }

  if(bearerToken){
    Object.assign(headers, {
      'Authorization': `Bearer ${bearerToken}`
    });
  }

  if (data) {
    Object.assign(headers, {
      'Content-Type': 'application/json',
      withCredentials: true
    });
    Object.assign(content, { data });
  }

  Object.assign(headers, {
    withCredentials: true
  });

  if (files) {
    const formData = new FormData();
    Object.keys(files).forEach(name => {
      formData.append(name, files[name]);
    })
    Object.assign(headers, { 'Content-Type': 'multipart/form-data' });
    Object.assign(content, { data: formData });
  }
  if(Object.getOwnPropertyNames(headers).length !== 0) {
    Object.assign(content, {headers});
  }
  if(Object.getOwnPropertyNames(credentials).length !== 0) {
    Object.assign(content, {credentials});
  }
  if(Object.getOwnPropertyNames(config).length !== 0) {
    Object.assign(content, {config});
  }
  return axios(content);
}

export default ApiEngine


