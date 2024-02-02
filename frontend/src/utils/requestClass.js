class RequestOptions {
  static controller = new AbortController();
  constructor(method, auth = '', body) {
    if (!body && !auth) {
      this.method = method;
      this.headers = {
        'Content-Type': 'application/json',
      };
    } else if (!body) {
      this.method = method;
      this.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      };
    } else {
      this.method = method;
      this.headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth}`,
      };
      this.body = JSON.stringify(body);
    }
  }

  get options() {
    return {
      signal: RequestOptions.controller.signal,
      method: this.method,
      headers: this.headers,
    };
  }

  get postOptions() {
    return {
      signal: RequestOptions.controller.signal,
      method: this.method,
      headers: this.headers,
      body: this.body,
    };
  }
}
export default RequestOptions;
