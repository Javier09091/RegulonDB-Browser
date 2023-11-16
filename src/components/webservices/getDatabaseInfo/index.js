import { useQuery } from "@apollo/client";
import { query_getSummaryHistoryData } from "./queries";



/**
 * Custom hook to fetch release versions and summary history data.
 *
 * @export
 * @returns {{ data: any; releases: any; error: any; loading: any; }}
 */
export function useGetReleasesVersions() {
    let {data, error, loading} = useQuery(query_getSummaryHistoryData) 
    let releases = data?.getDatabaseInfo
    return {data, releases, error, loading}
}