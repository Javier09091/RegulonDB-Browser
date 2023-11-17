import { gql } from "@apollo/client";


/**
 * This GraphQL fragment is designed to capture information related to citations, providing details about the publication and evidence associated with a particular piece of information.
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
 * This GraphQL fragment is designed to capture pagination-related information.
 *
 * @type {*}
 */
export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    limit
    totalResults
  }`

  
/**
 * This GraphQL query is designed to retrieve information about sigmulons based on advanced search criteria.
 *
 * @type {*}
 */
export const query_getSigmulonBy = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
query getSigmulon($advancedSearch: String){
    getSigmulonBy(advancedSearch:$advancedSearch){
      pagination {
        ...PAGINATION
      }
      data {
        _id
        allCitations {
          ...CITATIONS
        }
        sigmaFactor {
          _id
          gene {
            _id
            name
          }
          name
          sigmulonGenes {
            name
            _id
          }
          sigmulonRegulators {
            _id
            name
          }
          synonyms
        }
        statistics {
          cotranscriptionFactors
          genes
          promoters
          sigmaFactors
          transcriptionFactors
          transcriptionUnits
        }
        transcribedPromoters {
          _id
          boxes {
            leftEndPosition
            rightEndPosition
            sequence
            type
          }
          name
          operonId
          sequence
          transcribedGenes {
            _id
            distanceFromTSS
            name
          }
          citations {
            evidence {
              code
              _id
              name
              type
            }
            publication {
              authors
              citation
              _id
              pmid
              title
              url
              year
            }
          }
        }
      }
    }
  }
`

/**
 * This GraphQL query is designed to retrieve information about all sigmulons in the system.
 *
 * @type {*}
 */
export const query_getAllSigmulon = gql`
query getAllSigmulon {
    getAllSigmulon {
      data {
        _id
        sigmaFactor {
          _id
          gene {
            _id
            name
          }
          name
          sigmulonGenes {
            name
            _id
          }
          sigmulonRegulators {
            _id
            name
          }
          synonyms
        }
        statistics {
          cotranscriptionFactors
          genes
          promoters
          sigmaFactors
          transcriptionFactors
          transcriptionUnits
        }
      }
    }
  }`