import { gql } from '@apollo/client';


/**
 * It retrieves information about a phrase associated with a given object or set of objects.
 *
 * @type {*}
 */
export const query_GET_PHRASE_OF = gql`query GetPhraseOf($id: [String]){
    getPhraseOf(objectId: $id){
      _id
      name
      objectType
      propertyPhrases{
        associatedPhrases{
          phrase
          phraseId
          pmid
        }
        associatedProperty{
          name
          value
        }
        position
      }
      sourceId
    }
  }`