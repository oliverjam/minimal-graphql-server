function parseRequest(request) {
  return new Promise((resolve, reject) => {
    if (request.method === "GET") {
      const { searchParams } = new URL(request.url, "fake://");
      const query = searchParams.get("query");
      const variables = JSON.parse(searchParams.get("variables"));
      return resolve({ query, variables });
    }
    if (request.method === "POST") {
      let data = "";
      request.on("data", chunk => {
        data += chunk;
      });
      request.on("end", error => {
        if (error) {
          return reject(error);
        }
        return resolve(JSON.parse(data));
      });
    }
  });
}

module.exports = parseRequest;
