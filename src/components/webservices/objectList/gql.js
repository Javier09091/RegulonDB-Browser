import { gql } from "@apollo/client";


/**
 * GraphQL query to get a list of objects based on the specified datamart type.
 *
 * @type {*}
 */
export const QUERY_GetObjectList = gql`query GetObjectList($datamartType: String!) {
    getObjectList(datamartType: $datamartType) {
      _id
      datamartType
      encodedGenes
      name
      productsName
      sigmulonGeneName
      statistics {
        cotranscriptionFactors
        genes
        promoters
        sigmaFactors
        sites
        transcriptionFactors
        transcriptionUnits
      }
      synonyms
    }
  }`