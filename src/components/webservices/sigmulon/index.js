import { useQuery } from "@apollo/client";
import { DataVerifier } from "../../ui-components";
import { query_getSigmulonBy, query_getSigmulonBySearch } from "./query";


/**
 * This function utilizes the Apollo Client's useQuery hook to perform a GraphQL query to retrieve sigmulon data based on a specified search keyword.
 *
 * @export
 * @param {*} keyword
 * @returns {{ sigmulonData: any; error: any; loading: any; }}
 */
export function useGetSigmulonBySearch(keyword) {
  const { data, loading, error } = useQuery(query_getSigmulonBySearch, {
    variables: { search: keyword },
  });
  let sigmulonData;
  if (data) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulonData = data.getSigmulonBy.data;
      } else {
        sigmulonData = null;
      }
    } catch (error) {
      console.error("assign sigmulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_getSigmulonBySearch Error:", error);
    console.log("query: ", query_getSigmulonBySearch);
  }
  return { sigmulonData, error, loading };
}


/**
 * This function utilizes the Apollo Client's useQuery hook to perform a GraphQL query to retrieve detailed information about a sigmulon based on its unique identifier.
 *
 * @export
 * @param {*} sigmulonId
 * @returns {{ sigmulonData: any; error: any; loading: any; }}
 */
export function useGetSigmulonById(sigmulonId) {
  const { data, error, loading } = useQuery(query_getSigmulonBy, {
    variables: {
      advancedSearch: `${sigmulonId}[_id]`,
    },
  });
  let sigmulonData;
  if (data) {
    try {
      //console.log(data);
      if (DataVerifier.isValidArray(data.getSigmulonBy.data)) {
        sigmulonData = data.getSigmulonBy.data[0];
      } else {
        sigmulonData = null;
      }
    } catch (error) {
      console.error("assign sigmulonData error");
    }
  }
  if (error) {
    console.error("useQuery query_getSigmulonBy Error:", error);
    console.log("query: ", query_getSigmulonBy);
  }
  return { sigmulonData, error, loading };
}
