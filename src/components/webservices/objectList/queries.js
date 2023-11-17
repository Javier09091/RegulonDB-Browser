import { gql } from "@apollo/client";


/**
 * This query fetches specific information about objects based on the provided datamartType
 * @date 11/16/2023 - 10:02:06 PM
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