const { createServer } = require("http");
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => "Hello world",
};

const server = createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  graphql(schema, "{ hello }", root).then(result => {
    const { data } = result;
    response.end(JSON.stringify(data));
  });
});

server.listen(3333, () => console.log("Listening on http://localhost:3333"));
