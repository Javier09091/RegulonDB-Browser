import React, { useEffect, useState } from 'react';
import { gql } from "apollo-boost";
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/react-hooks';
import { Citations } from '../citations'
import {RegulatorBindigSites} from '../RegulatorBindingSites'

export function query(id_operon) {
    return gql`
    {
        getOperonBy(search: "${id_operon}") {
            data {
                _id
                operon{
                    id
                    strand
                }
                transcriptionUnits {
                    id
                    name
                    promoter {
                        id
                        name
                        bindsSigmaFactor {
                            sigmaFactor_id
                            sigmaFactor_name
                            ${Citations}
                        }
                        note
                        boxes {
                            leftEndPosition
                            rightEndPosition
                            sequence
                            type
                        }
                        score
                        sequence
                        synonyms
                        ${RegulatorBindigSites}
                        transcriptionStartSite {
                            leftEndPosition
                            rightEndPosition
                            range
                            type
                        }
                    }
                }
            }
            pagination{
                totalResults
            }
        }
      }
    `
}

const GetPromoter = ({
    id_operon = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const [_res, set_res] = useState(false);
    const { data, loading, error } = useQuery(query(id_operon))
    useEffect(() => {
        if (loading) {
            status('loading')
        }
        if (data && !_res) {
            set_res(true)
            if (data.getOperonBy.pagination.totalResults === 1) {
                try {
                    //console.log(data)
                    resoultsData(data.getOperonBy.data[0])
                    status('done')
                } catch (error) {
                    status('error')
                    console.log(error)
                }
            } else {
                resoultsData({})
                status('not found')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    },[loading, error, status, data, _res, resoultsData])
    if (loading) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export default GetPromoter;