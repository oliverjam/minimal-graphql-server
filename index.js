const { createServer } = require("http");
const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    hello(name: String!): String
  }
`);

const root = {
  hello: variables => `Hello ${variables.name}`,
};

const server = createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  const { searchParams } = new URL(request.url, "fake://");
  const query = searchParams.get("query");
  const variables = JSON.parse(searchParams.get("variables"));

  graphql(schema, query, root, null, variables)
    .then(result => {
    const { data } = result;
    response.end(JSON.stringify(data));
  });
});

server.listen(3333, () => console.log("Listening on http://localhost:3333"));
