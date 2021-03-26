import { gql } from "@apollo/client";

const HISTORIES = gql`
  query Histories {
    histories {
      title
      id
      details
    }
  }
`;

const HISTORY = gql`
  query History($id: ID!) {
    history(id: $id) {
      id
      title
    }
  }
`;
