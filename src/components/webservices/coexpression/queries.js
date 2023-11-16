import { gql } from "@apollo/client";

/**
 * GraphQL query to get the list of genes.
 * @type {DocumentNode}
 */
export const query_getAllGenes = gql`
  query GetGeneList {
    getObjectList(datamartType: "gene") {
      _id
      name
      synonyms
      productsName
    }
  }
`;

/**
 * GraphQL query to get ranks for a gene from a list of genes.
 * @type {DocumentNode}
 */
const query_getRankFromGeneList = gql`
  query getRankFromGeneList($gene: String!, $geneList: [String]!) {
    getRankFromGeneList(gene: $gene, geneList: $geneList) {
      gene {
        _id
        name
      }
      rank
      rgbColor
    }
  }
`;