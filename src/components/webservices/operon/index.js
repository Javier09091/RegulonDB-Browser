import { useQuery } from "@apollo/client";
import { query_GET_OPERON_BY } from "./queries"


/**
 * Fetches operon data by ID.
 *
 * @export
 * @param {{ _id: any; }} param0
 * @param {*} param0._id
 * @returns {{ operonData: any; loading: any; error: any; getOperonBy: any; }}
 */
export function useGetOperonByID({
    _id,
}) {
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: `${_id}[_id]`, limit: 1 }
    })
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let operonData
    try {
        if (data) {
            if(data.getOperonBy.data[0]){
              operonData = data.getOperonBy.data[0]  
            }else{
                operonData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonData, loading, error, getOperonBy: data?.getOperonBy }
}


/**
 * Fetches operon data by Transcription Unit (TU) ID.
 *
 * @export
 * @param {{ _tuId: any; }} param0
 * @param {*} param0._tuId
 * @returns {{ operonData: any; loading: any; error: any; getOperonBy: any; }}
 */
export function useGetOperonByTuId({
    _tuId,
}) {
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: `${_tuId}[transcriptionUnits._id]`, limit: 1 }
    })
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let operonData
    try {
        if (data) {
            if(data.getOperonBy.data[0]){
              operonData = data.getOperonBy.data[0]  
            }else{
                operonData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonData, loading, error, getOperonBy: data?.getOperonBy }
}


/**
 * Fetches operon data by a general search term.
 *
 * @export
 * @param {{ search: any; }} param0
 * @param {*} param0.search
 * @returns {{ operonsData: any; loading: any; error: any; getOperonBy: any; }}
 */
export function useGetOperonBySearch({
    search
}) {
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { search: search }
    })
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let operonsData
    try {
        if (data) {
            if(data.getOperonBy.data){
              operonsData = data.getOperonBy.data  
            }else{
                operonsData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonsData, loading, error, getOperonBy: data?.getOperonBy }
}


/**
 * Fetches operon data using advanced search criteria.
 *
 * @export
 * @param {{ advancedSearch: any; }} param0
 * @param {*} param0.advancedSearch
 * @returns {{ operonsData: any; loading: any; error: any; getOperonBy: any; }}
 */
export function useGetOperonByAdvancedSearch({
    advancedSearch
}) {
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_GET_OPERON_BY, {
        variables: { advancedSearch: advancedSearch }
    })
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let operonsData
    try {
        if (data) {
            if(data.getOperonBy.data){
              operonsData = data.getOperonBy.data  
            }else{
                operonsData = null
            }
        }
    } catch (error) {
        console.error("assign operonData value:", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    if (error) {
        console.error("query getOperonBy: ", error);
        console.log("query getOperonBy", query_GET_OPERON_BY);
    }
    return { operonsData, loading, error, getOperonBy: data?.getOperonBy }
}