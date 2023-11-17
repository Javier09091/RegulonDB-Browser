import {gql} from '@apollo/client'


/**
 * It is used to retrieve information about all available overviews.
 * @date 11/16/2023 - 10:24:16 PM
 *
 * @type {*}
 */
export const query_GET_ALL_OVERVIEWS = gql`
query GET_ALL_OVERVIEWS{
    getAllObjectInfo{
      _id
      queryName
      objectType
      graph{
        title
      }
    }
  }
`

/**
 * It is used to retrieve detailed information about a specific overview identified by _id.
 *
 * @type {*}
 */
export const query_GET_OVERVIEW = gql`
query GET_OVERVIEW($id: String){
  getOverview(_id:$id){
    _id
    queryName
    objectType
    graph{
      title
      description
      labelX
      labelY
      footGraph
      graphType
    }
    data{
      xAxis
      yAxis
      objectsRelated{
        _id
        name
        type
      }
    }

  }
}`