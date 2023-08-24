import PropTypes from 'prop-types';
import { ModalCitation } from './modal';

const PROP_TYPES = {
    allCitations: PropTypes.array.isRequired,
    citations: PropTypes.array.isRequired,
    list: PropTypes.bool
};

export const DEFAULT_ParagraphCitations_PROPS = {
    list: false,
}

function ParagraphCitations({
    allCitations,
    citations,
    list = false,
}) {
    return (
        <div style={{display: "grid", gridTemplateColumns: "20% 20% 20% 20% 20%"}} >
            {
                citations.map((cit, indx) => {
                    try {
                        //console.log(cit);
                        let index = allCitations.findIndex((citation) => citation?.publication?._id === cit?.publication?._id && citation?.evidence?._id === cit?.evidence?._id)+1
                        let evidence = cit?.evidence ? cit.evidence : undefined
                        let publication = cit?.publication ? cit.publication : undefined
                        return (
                            <div>
                                <ModalCitation key={`CitaitopnPH_${cit?.publication?._id}_${cit?.evidence?._id}_${indx}`}
                                index={index}
                                evidence={evidence}
                                publication={publication}
                            />
                            </div>
                        )
                    } catch (error) {
                        return null
                    }
                })
            }
        </div>
    );
}


ParagraphCitations.defaultProps = DEFAULT_ParagraphCitations_PROPS

ParagraphCitations.propTypes = PROP_TYPES

export { ParagraphCitations }