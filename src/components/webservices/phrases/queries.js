import { gql } from '@apollo/client';


/**
 * GraphQL query named GetPhraseOf uses the getPhraseOf query field to fetch information about one or more objects based on their IDs
 *
 * @type {*}
 */
export const query_GET_PHRASE_OF = gql`query GetPhraseOf($objectId: [String]) {
    getPhraseOf(objectId: $objectId) {
      _id
      name
      objectType
      propertyPhrases {
        associatedPhrases {
          phrase
          phraseId
          pmid
        }
        associatedProperty {
          name
          value
        }
        position
      }
      sourceId
    }
  }`