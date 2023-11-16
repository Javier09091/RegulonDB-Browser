import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GET_GENE_BY, query_getMainGeneBySearch } from "./queries";
import { useState } from "react";
import { DataVerifier } from "../../ui-components";

/**
 * Custom React hook for lazy loading genes by search.
 *
 * @param {Array<string>} unLoad - Array of gene IDs to be unloaded.
 * @param {function} setUnload - Function to set the unload state.
 * @param {Array<Object>} genes - Array of loaded genes.
 * @param {function} setGenes - Function to set the loaded genes.
 * @param {Array<string>} genesId - Array of gene IDs.
 * @returns {{ genes: Array<Object>, loading: boolean, error: any, loadState: number }}
 */
export function useLazyLoadGenesBySearch(
  unLoad = [],
  setUnload,
  genes,
  setGenes,
  genesId
) {
  
  /**
   * Length of array genesId
   *
   * @type {Number}
   */
  const totalOfElements = genesId.length;
  
  /**
   * Lazy query to get gene information.
   *
   * @type {*}
   */
  const [getGene, { data, loading: geneLoad, error: geneError }] = useLazyQuery(
    query_getMainGeneBySearch
  );

  if (totalOfElements < genes.length) {
    if (totalOfElements === 0) {
      setGenes([]);
    } else {
      
      /**
       * Initialize an empty array to store the found genes
       *
       * @type {{}}
       */
      let nGenes = [];
      genesId.forEach((id) => {
        
        /**
         * Find the gene in the genes array that has the same _id as the current id in the iteration
         *
         * @type {*}
         */
        const gn = genes.find((gene) => gene._id === id);
        if (gn) {
          nGenes.push(gn);
        }
      });
      if (DataVerifier.isValidArray(nGenes)) {
        setGenes(nGenes);
      }
    }
  }

  /**
   * Define a constant for the limit of indices to load
   *
   * @type {50}
   */
  const inxLimit = 50;
  
  /**
   * Initialize a state variable to keep track of the current loading operation's ID
   *  
   * @type {*}
   */
  const [id, setId] = useState();

  
  /**
   * Determine whether there are elements to unload
   *
   * @type {boolean}
   */
  const loading = unLoad.length > 0;
  
  /**
   * Initialize a variable to represent the load state
   *
   * @type {*}
   */
  let loadState = null;
  if (totalOfElements > 0) {
    loadState = 100 - (100 / totalOfElements) * unLoad.length;
  }
  
  /**
   * State hook for managing errors.
   *
   * @type {*}
   */
  const [error, setError] = useState();
  
  /**
   * Variable to store gene data received from the GraphQL query
   *
   * @type {*}
   */
  let genesData;
  try {
    if (data) {
      if (DataVerifier.isValidArray(data.getGenesBy.data)) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }

  if (!id && DataVerifier.isValidArray(unLoad)) {
    let _id = [];
    [...Array(inxLimit).keys()].forEach((n) => {
      let __id = unLoad.pop();
      if (__id) {
        _id.push(__id);
      }
    });

    if (DataVerifier.isValidArray(_id)) {
      setId(_id);
      getGene({ variables: { search: _id.join(" ") } });
      //console.log("ids:", _id);
    }
  } else {
    if (genesData && totalOfElements > genes.length) {
      let nGenes = [];
      genesData.forEach((geneData) => {
        if (!genes.find((gene) => gene._id === geneData._id)) {
          nGenes.push(geneData);
        }
      });
      if (DataVerifier.isValidArray(nGenes)) {
        setTimeout(() => {
          setGenes([...genes, ...genesData]);
        }, 25);
        if (id) {
          setId(undefined);
        }
      }
    }
  }
  //console.log(loading);
  return { genes: loading ? [] : genes, loading, error, loadState: loadState };
}

/**
 * Custom React hook for fetching main genes by search criteria.
 *
 * @export
 * @param {string} search
 * @returns {{ genesData: Array<any>; loading: boolean; error: any; }}
 */
export function useGetMainGenesBySearch(search) {
  
  /**
   * Query to fetch gene information based on search criteria
   *
   * @type {*}
   */
  const { data, loading, error } = useQuery(query_getMainGeneBySearch, {
    variables: { search: search },
  });
  
  /**
   * Array to store the fetched gene data
   *
   * @type {Array}
   */
  let genesData = [];
  try {
    if (data) {
      if (data.getGenesBy.data) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_getMainGeneBySearch);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBySearch", query_getMainGeneBySearch);
  }
  return { genesData, loading, error };
}

/**
 * Custom React hook for fetching genes by search criteria.
 *
 * @param {string} search - The search criteria for querying genes.
 * @returns {{ genesData: Array<Object>, loading: boolean, error: Error | undefined }}
 */
export function useGetGenesBySearch({ search }) {
  
  /**
   * Query to fetch gene information based on search criteria
   *
   * @type {*}
   */
  const { data, loading, error } = useQuery(query_GET_GENE_BY, {
    variables: { search: search },
  });
  
  /**
   * Array to store the fetched gene data
   *
   * @type {Array}
   */
  let genesData = [];
  try {
    if (data) {
      if (data.getGenesBy.data) {
        genesData = data.getGenesBy.data;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBySearch", query_GET_GENE_BY);
  }
  return { genesData, loading, error };
}

/**
 * Custom React hook for fetching genes based on various search criteria.
 *
 * @param {string} _id - The ID of the gene to fetch.
 * @param {string} advancedSearch - Advanced search criteria for querying genes.
 * @param {boolean} [fullMatchOnly=false] - Flag indicating whether to perform a full match.
 * @param {number} [limit=1] - The maximum number of genes to fetch.
 * @param {string} organismName - The name of the organism to filter genes.
 * @param {number} page - The page number for paginated results.
 * @param {string} properties - Additional properties for the gene search.
 * @param {string} search - The search criteria for querying genes.
 * @returns {{ geneData: Object | null, loading: boolean, error: Error | undefined, getGenesBy: Object | undefined }}
 */
export function useGetGenesBy({
  _id,
  advancedSearch,
  fullMatchOnly = false,
  limit = 1,
  organismName,
  page,
  properties,
  search,
}) {
  if (_id) {
    advancedSearch = `${_id}[_id]`;
  }
  
  /**
   * Query to fetch gene information based on search criteria
   *
   * @type {*}
   */
  const { data, loading, error } = useQuery(query_GET_GENE_BY, {
    variables: {
      advancedSearch: advancedSearch,
      fullMatchOnly: fullMatchOnly,
      limit: limit,
      organismName: organismName,
      page: page,
      properties: properties,
      search: search,
    },
  });

  
  /**
   * Variable to store the fetched gene data
   *
   * @type {*}
   */
  let geneData;
  try {
    if (data) {
      if (data.getGenesBy.data[0]) {
        geneData = data.getGenesBy.data[0];
      } else {
        geneData = null;
      }
    }
  } catch (error) {
    console.error("assign geneData value:", error);
    console.log("query getGeneBy", query_GET_GENE_BY);
  }
  if (error) {
    console.error("query getGeneBy: ", error);
    console.log("query getGeneBy", query_GET_GENE_BY);
  }
  return { geneData, loading, error, getGenesBy: data?.getGenesBy };
}

/**
 [...Array(inxLimit).keys()].forEach((n) => {
        if (
          genesId[index + n] &&
          !genes.find((gene) => gene._id === genesId[index + n])
        ) {
          _id.push(genesId[index + n]);
        }
      });
      if (DataVerifier.isValidArray(_id)) {
        setId(_id);
        getGene({ variables: { search: _id.join(" ") } });
        console.log("index: " + index, _id);
      }
 */
