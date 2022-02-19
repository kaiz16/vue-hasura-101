import gql from "graphql-tag";

export const GetTodos = gql`
  subscription GetTodos {
    todos {
      title
      description
      id
      is_completed
    }
  }
`;
