import { gql } from "@apollo/client"


/**
 * Fragment detailing statistics. 
 * @type {"\nfragment detailed on detailedStatistics {\n    confirmed\n    strong\n    total\n    weak\n    withoutEvidences\n  }\n"}
 */
const fragment_detailed = `
fragment detailed on detailedStatistics {
    confirmed
    strong
    total
    weak
    withoutEvidences
  }
`

/**
 * Fragment detailing external references.
 *
 * @type {"\nfragment detailedExtern on dbInfoExternalReferencesType{\n    total\n    origin{\n      expasy\n      genbank\n      geneprotec\n      medline\n      ouMicroArray\n      pdb\n      pir\n      swissprot     \n      }\n  }\n"}
 */
const fragment_detailedExtern = `
fragment detailedExtern on dbInfoExternalReferencesType{
    total
    origin{
      expasy
      genbank
      geneprotec
      medline
      ouMicroArray
      pdb
      pir
      swissprot     
      }
  }
`

/**
 * Fragment detailing product information.
 *
 * @type {"\nfragment product on productsDBInfoType{\n    polypeptides{\n      ...detailed\n    } \n    rnas{\n      ...detailed\n    }\n   srna{\n    ...detailed\n   }\n  }\n"}
 */
const fragment_product = `
fragment product on productsDBInfoType{
    polypeptides{
      ...detailed
    } 
    rnas{
      ...detailed
    }
   srna{
    ...detailed
   }
  }
`

/**
 * Fragment detailing regulons information.
 *
 * @type {"\nfragment regulons on dbInfoRegulons{\n    complexRegulons{\n      ...detailed\n    } \n    simpleRegulons{\n      ...detailed\n    }\n   total\n  }\n"}
 */
const fragment_regulons = `
fragment regulons on dbInfoRegulons{
    complexRegulons{
      ...detailed
    } 
    simpleRegulons{
      ...detailed
    }
   total
  }
`

/**
 * Query to get summary history data.
 *
 * @type {*}
 */
export const query_getSummaryHistoryData = gql`
${fragment_detailed}
${fragment_detailedExtern}
${fragment_product}
${fragment_regulons}
  query getSummaryHistoryData{
    getDatabaseInfo{
      releaseDate
      route
      regulonDBVersion
      ecocycVersion
      lcVersion
      note
      statistics{
        attenuators{
          ...detailed
        }
        effectors{
          ...detailed
        } 
        externalReferences{
          ...detailedExtern
        }
        functConfTF{
          ...detailed
        }
        functionalClasses{
          ...detailed
        }
        genes{
          ...detailed
        }
        gensorUnits{
          ...detailed
        }
        operon{
          ...detailed
        }
        product{
          ...product
        }
        promoters{
          ...detailed
        }
        regulatorBindingSites{
          ...detailed
        }
        regulatoryInteractions{
          ...detailed
        }
        regulons{
          ...regulons
        }
        riboswitches{
          ...detailed
        }
        shineDalgarnos{
          ...detailed
        }
        srnaInteractions{
          ...detailed
        }
        synonyms{
          ...detailed
        }
        terminators{
          ...detailed
        }
        transcriptionFactors{
          ...detailed
        }
        transcriptionUnits{
          ...detailed
        }
      }
    }
  }
`