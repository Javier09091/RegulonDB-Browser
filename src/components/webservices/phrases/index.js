import { useQuery } from '@apollo/react-hooks';
import { query_GET_PHRASE_OF } from './queries';
import { DataVerifier } from "../../ui-components";



/**
 * Utilizes the useQuery hook from Apollo Client to fetch data using the query_GET_PHRASE_OF
 *
 * @export
 * @param {*} id
 * @returns {{ phrases: any; propertiesPhrase: {}; error: any; loading: any; }}
 */
export function useGetPhraseByObjectId(id) {
    const { loading, error, data } = useQuery(query_GET_PHRASE_OF, {
        variables: { objectId: id },
    });

    let phrases
    let propertiesPhrase = {}
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getPhraseOf)){
              phrases = data.getPhraseOf[0]
              propertiesPhrase = {}
              if (DataVerifier.isValidArray(phrases.propertyPhrases)) {
                phrases.propertyPhrases.forEach(item => {
                    if(DataVerifier.isValidArray(item.associatedProperty)){
                        item.associatedProperty.forEach((property=>{
                            propertiesPhrase[property.name] = item.associatedPhrases
                        }))
                    }
                });
              }
              
            }else{
                phrases = null
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query GetPhraseOf", query_GET_PHRASE_OF);
    }
    if (error) {
        console.error("query getPhraseOf: ", error);
        console.log("query GetPhraseOf", query_GET_PHRASE_OF);
    }
    return {phrases, propertiesPhrase, error, loading}
}
