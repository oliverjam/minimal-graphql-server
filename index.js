const { createServer } = require("http");
const { graphql, buildSchema } = require("graphql");
const parseRequest = require("./parseRequest");

const schema = buildSchema(`
  type Query {
    hello(name: String!): String
  }
  input TodoInput {
    text: String!
  }
  type Todo {
    id: ID!
    text: String!
    done: Boolean!
  }
  type Mutation {
    createTodo(todo: TodoInput!): Todo
  }
`);

const root = {
  hello: variables => `Hello ${variables.name}`,
  createTodo: input => ({
    ...input.todo,
    done: false,
    id: String(Math.random()),
  }),
};

const server = createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  parseRequest(request).then(({ query, variables }) => {
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
});

server.listen(3333, () => console.log("Listening on http://localhost:3333"));
