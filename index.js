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
        const { data, errors } = result;
        if (errors) throw errors;
      response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ data }));
    })
    .catch(error => {
      console.log(error);

        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({
            errors: Array.isArray(error)
              ? error.map(e => e.message)
              : [error.message],
          })
        );
    });
});

server.listen(3333, () => console.log("Listening on http://localhost:3333"));
