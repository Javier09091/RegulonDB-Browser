import { QUERY_GetObjectList } from "./queries";
import { useQuery } from "@apollo/client";


/**
 * Custom hook to fetch a list of objects based on the specified datamart type.
 *
 * @export
 * @param {{ datamartType: any; }} param0
 * @param {*} param0.datamartType
 * @returns {{ objectsList: any; loading: any; error: any; getObjectList: any; }}
 */
export default function useGetObjectList({datamartType}) {
    
    /**
     *  Use the Apollo Client's useQuery hook to fetch data
     *
     * @type {*}
     */
    const { data, loading, error } = useQuery(QUERY_GetObjectList, {
        variables: {
            datamartType: datamartType
        }
    })
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let objectsList
    try {
        if (data && !error) {
            objectsList = data.getObjectList ? data.getObjectList  : null
        }
    } catch (error) {
        console.error("assign objectsList value:", error);
        console.log("query getGeneBy", QUERY_GetObjectList);
    }
    if (error) {
        console.error("query getGeneBy: ", error);
        console.log("query getGeneBy", QUERY_GetObjectList);
    }
    return { objectsList, loading, error, getObjectList: data?.getObjectList }
}