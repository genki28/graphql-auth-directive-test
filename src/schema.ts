import { gql } from "apollo-server-express";

export const schema = gql`
  directive @auth(requires: Role!) on FIELD_DEFINITION

  enum Role {
    ADMIN
    OWNER
    USER
  }

  type Message {
    id: ID
    receiverId: ID
    senderId: ID
    text: String
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    role: String @auth(requires: ADMIN)
    message(id: ID!): Message
  }

  type Query {
    currentUser: User @auth(requires: USER)
  }
`;
