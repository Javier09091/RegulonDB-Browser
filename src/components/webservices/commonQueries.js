import { gql } from "@apollo/client";


/**
 * 
 * The fragment_CITATIONS is a GraphQL fragment that defines a reusable piece of a query for retrieving citation information. 
 *
 * @type {*}
 */
export const fragment_CITATIONS = gql`fragment CITATIONS on Citations {
    publication {
      _id
      authors
      pmid
      citation
      url
      title
      year
    }
    evidence {
      _id
      name
      code
      type
    }
  }`

  
  /**
   * 
   * The fragment_PAGINATION is a GraphQL fragment that defines a reusable piece of a query for retrieving pagination information.
   * 
   * @type {*}
   */
  export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    totalResults
  }`

  
/**
 * 
The fragment_ExternalCrossReferences is a GraphQL fragment that defines a reusable piece of a query for retrieving information about external cross-references associated with an object.
 *
 * @type {*}
 */
export const fragment_ExternalCrossReferences = gql`fragment ExternalCrossReferences on ExternalCrossReferences {
    externalCrossReferenceId
    externalCrossReferenceName
    objectId
    url
  }`