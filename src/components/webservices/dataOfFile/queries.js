import { gql } from "@apollo/client";

/**
 * GraphQL query to get data of a specific file.
 * @type {DocumentNode}
 */
export const query_GET_DATA_FILE = gql`query GetDataOfFile($fileName: String) {
    getDataOfFile(fileName: $fileName) {
      _id
      citation
      columnsDetails
      contact {
        person
        email
        webPage
      }
      content
      creationDate
      fileFormat
      fileName
      license
      version
    }
  }`