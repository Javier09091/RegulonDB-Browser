import React, { useState, useRef } from 'react';
import Image from '../../components/ui-components/infoDisplay/media/Image'
import img from '../../../img/gene_context.png'
import imgZ from '../../../img/gene_zoom.png'
import { IconButton } from '../../components/ui-components/basicInput/Buttons'
import { PanZoom } from 'react-easy-panzoom'

const GraphicGene = ({
    idGene
}) => {
    let imge = useRef(null)
    const [zoom, setZoom] = useState(false)

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <div style={{ textAlign: "center", overflow: 'auto' }}>
                            <PanZoom ref={imge} disableKeyInteraction={true} disableDoubleClickZoom={true} disableScrollZoom={true}>

                                {
                                    zoom
                                        ? <Image id={idGene} urlImage={imgZ} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                        : <Image id={idGene} urlImage={img} imgStyle={{ maxWidth: "100%", height: "120px" }} />
                                }

                            </PanZoom>
                        </div>

                    </td>
                </tr>
                <tr>
                    <td>
                        <div style={{ textAlign: "center" }}>
                            <IconButton style={{ float: 'left' }} icon="add" onClick={() => {
                                imge.current.zoomIn(5)
                            }} />
                            <IconButton style={{ float: 'left' }} icon="fullscreen_exit" onClick={() => {
                                imge.current.reset()
                            }} />
                            <IconButton style={{ float: 'left' }} icon="remove" onClick={() => {
                                imge.current.zoomOut(5)
                            }} />
                            <IconButton style={{ float: 'left' }} icon="code" onClick={() => { setZoom(!zoom) }} />
                            <IconButton icon="help" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default GraphicGene;