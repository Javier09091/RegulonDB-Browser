import { useQuery } from "@apollo/client";
import { query_getAllGUs, query_getGuById, query_getGuBySearch } from "./queries";
import { DataVerifier } from "../../ui-components";

/**
 * Hook to retrieve data for all gene units.
 *
 * @export
 * @returns {{ gusData: any; loading: any; error: any; }}
 */
export function useGetAllGus() {
    
    /**
     * Execute the GraphQL query
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_getAllGUs)
    
    /**
     * Initialize an array to store gene unit data
     *
     * @type {array}
     */
    let gusData = []
    try {
        if (data) {
            if(data.getAllGUs.data){
              gusData = data.getAllGUs.data
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBySearch", query_getAllGUs);
    }
    return { gusData, loading, error }
}


/**
 * Hook to retrieve gene units based on a search keyword.
 *
 * @export
 * @param {*} keyword - The search keyword.
 * @returns {{ gusData: any; loading: any; error: any; }}
 */
export function useGetGuBySearch(keyword) {
    
    /**
     * Execute the GraphQL query with variables
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_getGuBySearch,{variables:{search: keyword}})
    
    /**
     * Extracted gene units data from the GraphQL response.
     *
     * @type {array}
     */
    let gusData = []
    //console.log(data);
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getGUsBy.data)){
              gusData = data.getGUsBy.data
            }else{
                gusData = null
            }
        }
    } catch (error) {
        console.error("assign geneData value:", error);
        console.log("query getGUBySearch", query_getGuBySearch);
    }
    if (error) {
        console.error("query getGUBy: ", error);
        console.log("query getGUBySearch", query_getGuBySearch);
    }
    return { gusData, loading, error }
}


/**
 * Hook to retrieve gene unit data by ID.
 *
 * @export
 * @param {*} guId - The ID of the gene unit.
 * @returns {{ guData: any; loading: any; error: any; }}
 */
export function useGetGuById(guId) {
    
    /**
     *  GraphQL query to get gene unit data by ID.
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(query_getGuById,{variables:{advancedSearch: `${guId}[_id]`}})
    
    /**
     *  Extracted gene unit data from the GraphQL response.
     *
     * @type {array}
     */
    let guData = []
    console.log(data);
    try {
        if (data) {
            if(DataVerifier.isValidArray(data.getGUsBy.data)){
              guData = data.getGUsBy.data[0]
            }else{
                guData = null
            }
        }
    } catch (error) {
        console.error("assign GuData value:", error);
        console.log("query getGUById", query_getGuById);
    }
    if (error) {
        console.error("query getGUBy: ", error);
        console.log("query getGUById", query_getGuById);
    }
    return { guData, loading, error }
}