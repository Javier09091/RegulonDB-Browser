import { gql } from "@apollo/client";


/**
 * The fragment_CITATIONS is a GraphQL fragment that defines a structure for fetching information related to citations.
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
 * The fragment_PAGINATION is a GraphQL fragment that defines a structure for fetching pagination information. 
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
   * 
   * The query_getSigmulonBySearch is a GraphQL query that retrieves information about sigmulons based on a search query. 
   *
   * @type {*}
   */
  export const query_getSigmulonBySearch = gql`
  ${fragment_PAGINATION}
  query getSigmulon($search: String){
      getSigmulonBy(search:$search){
        pagination {
          ...PAGINATION
        }
        data {
          _id
          sigmaFactor {
            _id
            gene {
              _id
              name
            }
            name
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
    }
  `

  
/**
 * 
 * The query_getSigmulonBy is a GraphQL query that fetches detailed information about sigmulons based on advanced search criteria.
 * 
 *  @type {*}
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
            geneOntologyTerms{
              biologicalProcess{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
              cellularComponent{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
              molecularFunction{
                _id
                citations{
                  ...CITATIONS
                }
                name
                productsIds
              }
            }
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
          TSSPosition
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
 * 
 * The query_getAllSigmulon is a GraphQL query that fetches information about all sigmulons. 
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