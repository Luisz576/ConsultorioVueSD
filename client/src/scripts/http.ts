class Http{
  API_URL = "http://127.0.0.1:5000/api"

  async get(url: string, parameters:any = {}, headers:any = {}){
    let v = false
    url += "?"
    for(let p in parameters){
      if(v){
        url += "&"
      }
      url += p + "=" + parameters[p]
      v = true
    }
    headers["Content-Type"] = "application/json"
    return fetch(encodeURI(url), {
      method: "GET",
      headers: headers
    })
  }
  async post(url: string, body:any = {}, headers:any = {}){
    headers["Content-Type"] = "application/json"
    return fetch(encodeURI(url), {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers
    })
  }
  async patch(url: string, body:any = {}, headers:any = {}){
    headers["Content-Type"] = "application/json"
    return fetch(encodeURI(url), {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: headers
    })
  }
  async delete(url: string, body:any = {}, headers:any = {}){
    headers["Content-Type"] = "application/json"
    return fetch(encodeURI(url), {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: headers
    })
  }
  async head(url: string, headers:any = {}){
    headers["Content-Type"] = "application/json"
    return fetch(encodeURI(url), {
      method: "HEAD",
      headers: headers
    })
  }
}

const http = new Http()
export default http
