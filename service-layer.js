export default class serviceLayer {
  constructor(header, requests) {
    this.header = header;
    this.method = null;
    this.requests = requests;
    this.results = {};
    this.init();
  }

  init() {
    Object.keys(this.requests).map((key) =>
      this.buildQuery(this.requests[key], key)
    );
  }

  mapTextValue(textKey, valueKey) {
    return function (obj) {
      (obj.text = obj[textKey]), (obj.value = obj[valueKey]);
      return obj;
    };
  }

  buildQueryString(uri, args) {
    let params = args ? args : {};
    return (
      uri +
      "?" +
      Object.keys(params)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(args[key])
        )
        .join("&")
    );
  }

  async buildQuery(request, key) {
    let results = await this.endpoint(
      request.endpoint,
      request.method,
      request.args
    );

    this.results[key] = results.map(
      this.mapTextValue(request.text, request.value)
    );
  }

  async endpoint(uri, method, args) {
    method = method.toUpperCase();
    let result;
    if (method === "GET") {
      this.method = "GET";
      result = await fetch(this.buildQueryString(uri, args), {
        method,
        headers: this.header,
      });
    }
    if (method === "POST") {
      this.method = "POST";
      result = await fetch(uri, {
        method,
        headers: this.header,
        body: JSON.stringify(args),
      });
    }

    const response = await result.json();
    return response.data;
  }
}
