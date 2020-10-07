import React, { useState } from 'react';
import Button from '../../components/ui-components/basicInput/Buttons'
import GnDescription from './GeneDescription'
import GnProducts from './GeneProduct'
import AllCits from '../../components/cits/Cits'
//import GnGrowthC from './GeneGrowthConditions'
import GnAllInfo from './GeneAllInfo'

const sites = ['all','description', 'product', 'growthconditions']

const GeneTabs = (
    {
        allCitations = [],
        prodCount,
        gwcCount,
        section = '',
        site = 'all',
        idGene,
    }
) => {
    const [tab, setTab] = useState(site)
    
    return (
        <>
                <nav className="tabHeader">
                    {
                        sites.map((item) => {
                            let styleTab = "tab"
                            if (tab === item) {
                                styleTab = "tabActive"
                            }
                            let number = ''
                            switch (item) {
                                case "products":
                                    if (prodCount === 0) {
                                        return null
                                    }
                                    number = '('+prodCount+')'
                                    break;
                                case "growthconditions":
                                    if (gwcCount === 0) {
                                        return null
                                    }
                                    number = '('+gwcCount+')'
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <div key={item} className="tabContent">
                                    <Button id={item} className={styleTab} label={`${item.toUpperCase()}${number}`} onClick={()=>{setTab(item)}} />
                                </div>
                            )
                        })
                    }
                </nav>
                <>
                    {
                        TabSelector(tab, idGene, allCitations)
                    }
                    {
                        AllCits(allCitations,false,true,true)
                    }
                </>

            </>
    );
}
 
export default GeneTabs;



function TabSelector(item, idGene, allCitations) {
    switch (item) {
        case "description":
            return <GnDescription geneID={idGene} allCitations={allCitations} />
        case "product":
            return <GnProducts geneID={idGene} />
        case "all":
            return <GnAllInfo idGene={idGene} allCitations={allCitations}/>
        default:
            return <h2>Select a tab option</h2>
    }
}
/*

        
        case "GROWTH CONDITIONS":
            return <GnGrowthC geneID={idGene} />
        case "ALL":
            return <GnAllInfo idGene={idGene} />
        default:
            return <h3>Select a tab option</h3>
    }
}
*/
