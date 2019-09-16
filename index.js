const { createServer } = require("http");

const server = createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.end("Hello world");
});

server.listen(3333, () => console.log("Listening on http://localhost:3333"));
