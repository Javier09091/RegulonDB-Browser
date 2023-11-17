import { gql } from "@apollo/client";


/**
 * 
 * The fragment_CITATIONS is a GraphQL fragment that defines a reusable piece of a query for retrieving information about citations associated with an object. 
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
 * The fragment_PAGINATION is a GraphQL fragment that defines a reusable piece of a query for retrieving pagination information. 
 *
 * @type {*}
 */
export const fragment_PAGINATION = gql`fragment PAGINATION on Pagination {
    currentPage
    firstPage
    hasNextPage
    lastPage
    limit
    totalResults
  }`

  
/**
 * 
 * The fragment_ExternalCrossReferences is a GraphQL fragment that defines a reusable piece of a query for retrieving external cross-reference information. 
 *
 * @type {*}
 */
export const fragment_ExternalCrossReferences = gql`fragment ExternalCrossReferences on ExternalCrossReferences {
  externalCrossReferenceId
  externalCrossReferenceName
  objectId
  url
}`


/**
 * The fragment_SrnaProducts is a GraphQL fragment that defines a reusable piece of a query for retrieving information about small RNA (sRNA) products.
 *
 * @type {*}
 */
export const fragment_SrnaProducts = gql`fragment SRNA_PRODUCTS on srnaProduct {
  citations {
    ...CITATIONS
  }
  externalCrossReferences {
    ...ExternalCrossReferences
  }
  gene {
    _id
    gcContent
    genomePosition
    name
    strand
  }
  name
  note
  sequence
  synonyms
}`


/**
 * 
 * The fragment_RegulatoryInteractions is a GraphQL fragment that defines a reusable piece of a query for retrieving information about regulatory interactions involving small RNA (sRNA). 
 *
 * @type {*}
 */
export const fragment_RegulatoryInteractions = gql`fragment RegulatoryInteractions on srnaRegulatoryInteractions {
  _id
  citations {
    ...CITATIONS
  }
  distanceToGene
  function
  mechanism
  regulatedEntity {
    _id
    name
    type
  }
  regulatoryBindingSites {
    absolutePosition
    citations {
      ...CITATIONS
    }
    function
    _id
    leftEndPosition
    rightEndPosition
    sequence
    strand
  }
}`


/**
 * This fragment represents a summary object with fields activated, dual, repressed, total, and unknown
 *
 * @type {*}
 */
const fragment_SrnaSummary = gql`fragment SummaryObject on SummaryObject {
  activated
  dual
  repressed
  total
  unknown
}

fragment Summary on SrnaSummary {
  bindingSites {
    ...SummaryObject
  }
  genes {
    ...SummaryObject
  }
  regulatoryInteractions {
    ...SummaryObject
  }
  sigmaFactors {
    ...SummaryObject
  }
  transcriptionFactors {
    ...SummaryObject
  }
  transcriptionUnits {
    ...SummaryObject
  }
}`


/**
 * It retrieves information about small RNAs. The query utilizes several fragments (CITATIONS, PAGINATION, ExternalCrossReferences, SrnaProducts, RegulatoryInteractions, and SrnaSummary) to structure and organize the requested data. 
 *
 * @type {*}
 */
export const query_getAllSRNA = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ExternalCrossReferences}
${fragment_SrnaProducts}
${fragment_RegulatoryInteractions}
${fragment_SrnaSummary}
query getAllSRNA($limit: Int, $page: Int) {
  getAllSrnas(limit: $limit, page: $page) {
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      product {
        ...SRNA_PRODUCTS
      }
      regulatoryInteractions {
        ...RegulatoryInteractions
      }
      summary{
        ...Summary
      }
    }
  }
}   
`


/**
 * 
 *The GraphQL query query_getSrnaBy is designed to retrieve information about small RNAs based on specified parameters. This query includes several fragments (CITATIONS, PAGINATION, ExternalCrossReferences, SrnaProducts, RegulatoryInteractions, and SrnaSummary) to structure and organize the requested data. 
 *
 * @type {*}
 */
export const query_getSrnaBy = gql`
${fragment_CITATIONS}
${fragment_PAGINATION}
${fragment_ExternalCrossReferences}
${fragment_SrnaProducts}
${fragment_RegulatoryInteractions}
${fragment_SrnaSummary}
query getSrnaBy(
  $advancedSearch: String
  $fullMatchOnly: Boolean
  $limit: Int 
  $page: Int
	$properties: [String]
	$search: String) {
  getSrnaBy(
    advancedSearch:$advancedSearch
    fullMatchOnly:$fullMatchOnly
    limit:$limit
    page:$page
    properties:$properties
    search:$search
  ) { 
    data {
      _id
      allCitations {
        ...CITATIONS
      }
      product {
        ...SRNA_PRODUCTS
      }
      regulatoryInteractions {
        ...RegulatoryInteractions
      }
      summary {
        ...Summary
      }
    }
    pagination {
      ...PAGINATION
    }
  }
}
`
