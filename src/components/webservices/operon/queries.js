import { gql } from "@apollo/client";
import { fragment_CITATIONS, fragment_PAGINATION } from "../commonQueries";


/**
 * Defines the structure of data for regulator binding sites
 *
 * @type {*}
 */
export const fragment_RegulatorBS = gql`fragment RegulatorBS on RegulatorBindingSites {
    regulator {
      _id
      name
      abbreviatedName
      function
      conformations{
        name
      }
    }
    regulatoryInteractions {
      _id
      relativeCenterPosition
      function
      note
      mechanism
      regulatorySite {
        _id
        centerEndPosition
        citations {
          ...CITATIONS
        }
        leftEndPosition
        length
        note
        rightEndPosition
        sequence
      }
      citations {
        ...CITATIONS
      }
    }
    function
  }`

  
/**
 * Request information about operons, providing a structured way to handle and organize data related to operons, including their regulatory positions, statistics, and citations.
 *
 * @type {*}
 */
export const fragment_OPERON = gql`fragment OPERON on Operon {
    _id
    name
    regulationPositions {
      leftEndPosition
      rightEndPosition
    }
    strand
    statistics{
      genes
      promoters
      transcriptionUnits
    }
    citations {
      ...CITATIONS
    }
  }`

  
/**
 * Request information about transcription units and their associated genes, promoters, terminators, regulator binding sites, statistics, and citations in GraphQL queries.
 *
 * @type {*}
 */
export const fragment_TRANSCRIPTIONUNIT = gql`fragment TRANSCRIPTIONUNITS on TranscriptionUnits {
    _id
    name
    note
    synonyms
    confidenceLevel
    firstGene {
      _id
      distanceToPromoter
      name
    }
    genes {
      _id
      name
      regulatorBindingSites {
        ...RegulatorBS
      }
    }
    promoter {
      _id
      name
      additiveEvidences {
        category
        code
        type
      }
      bindsSigmaFactor {
        _id
        citations {
          ...CITATIONS
        }
        name
      }
      confidenceLevel
      citations {
        ...CITATIONS
      }
      note
      boxes {
        leftEndPosition
        rightEndPosition
        sequence
        type
      }
      score
      sequence
      synonyms
      regulatorBindingSites {
        ...RegulatorBS
      }
      transcriptionStartSite {
        leftEndPosition
        rightEndPosition
        range
        type
      }
    }
    terminators {
      _id
      class
      confidenceLevel
      additiveEvidences {
        category
        code
        type
      }
      citations {
        ...CITATIONS
      }
      sequence
      transcriptionTerminationSite {
        leftEndPosition
        rightEndPosition
        type
      }
    }
    regulatorBindingSites {
      ...RegulatorBS
    }
    statistics {
      genes
      sites
      transcriptionFactors
    }
    citations {
      ...CITATIONS
    }
  }`



/**
 * It retrieves detailed information about operons, including associated transcription units, citations, and pagination details based on specified search criteria.
 * @date 11/16/2023 - 10:14:21 PM
 *
 * @type {*}
 */
export const query_GET_OPERON_BY = gql`
${fragment_CITATIONS}
${fragment_RegulatorBS}
${fragment_OPERON}
${fragment_TRANSCRIPTIONUNIT}
${fragment_PAGINATION}
query GetOperonInfo(
    $advancedSearch: String
    $search: String
    $limit: Int
  ) {
    getOperonBy(
      advancedSearch: $advancedSearch
      search: $search
      limit: $limit
    ) {
      data {
        _id
        schemaVersion
        organism {
          _id
          name
        }
        allCitations {
          ...CITATIONS
        }
        operon {
          ...OPERON
        }
  
        transcriptionUnits {
          ...TRANSCRIPTIONUNITS
        }
      }
      pagination {
        ...PAGINATION
      }
    }
  }`;
