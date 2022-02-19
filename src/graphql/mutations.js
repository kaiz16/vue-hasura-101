import gql from "graphql-tag";

export const AddTodo = gql`
  mutation AddTodo(
    $title: String!
    $description: String!
    $is_completed: Boolean!
  ) {
    insert_todos(
      objects: {
        title: $title
        description: $description
        is_completed: $is_completed
      }
    ) {
      returning {
        description
        id
        is_completed
        title
      }
    }
  }
`;
