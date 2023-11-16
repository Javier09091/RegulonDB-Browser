import { useQuery, useLazyQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import { query_GET_DATA_FILE } from "./queries";


/**
 * Custom React hook for fetching data of a specific file
 * @export
 * @param {string} fileName - The name of the file to retrieve data for.
 * @returns {{ fileData: any; loading: any; error: any; }}
 */
export function useGetDataFile(fileName) {
  
  /**
   * Description placeholder
   *
   * @type {HookResult}
   */
  const { data, loading, error } = useQuery(query_GET_DATA_FILE, {
    variables: { fileName: fileName },
  });
/**
   * The data of the specified file.
   * @type {*}
   */
  let fileData;

  try {
    if (data) {
      if (DataVerifier.isValidObject(data.getDataOfFile)) {
        fileData = data.getDataOfFile;
      } else {
        fileData = null;
      }
    }
  } catch (error) {
    console.error("assign fileData value:", error);
    console.log("query getDataOfFile", query_GET_DATA_FILE);
  }
  if (error) {
    console.error("query getDataOfFile:", error);
    console.log("query getDataOfFile", query_GET_DATA_FILE);
  }

  return { fileData, loading, error };
}

/**
 * Custom React hook for lazy loading data of a specific file.
 *
 * @export
 * @returns {Array<Function, { loading: boolean }>}
 */
export function useLazyGetDataFile() {
  const [getFile, { loading }] = useLazyQuery(query_GET_DATA_FILE);

  return [getFile, { loading }];
}
