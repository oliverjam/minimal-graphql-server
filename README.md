# Minimal GraphQL Server

This is a (very) minimal implementation of a server using GraphQL. It was mostly created to better understand what libraries like [Express GraphQL](https://github.com/graphql/express-graphql/) actually do.

## Run locally

1. Clone this repo
1. `npm install`
1. `npm start`

You can then send requests to `localhost:3333` using a GraphQL client like [GraphQL Playground](https://github.com/prisma/graphql-playground). Alternatively you can send raw HTTP requests however you like. These must either be `POST` requests with JSON bodies or `GET` requests with querystrings.

## Schema

```graphql
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
```
