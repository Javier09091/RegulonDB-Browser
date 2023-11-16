import { gql } from "@apollo/client";


/**
 * GraphQL query to retrieve data for the main view.
 *
 * @type {*}
 */
export const query_mainView = gql`
  query mainViewQuery {
    getAllGUs {
      data {
        _id
        gensorUnit {
          groups
          _id
          name
        }
      }
    }
  }
`;