import { useContext } from 'react'
import { Citation } from './citation'

export function relCitation(allCitations, idCit, small = true) {
    const re = /RDBECOLI(PRC|EVC)[0-9]{5}/
    console.log(idCit)
    if (!re.exec(idCit)) {
        return ""
    }
    const id_cit = re.exec(idCit)[0]
    const index = allCitations.findIndex(element => element?.publication?.id === id_cit) + 1
    if (!index) {
        return ""
    }
    const fullCit = allCitations[index]
    const publication = fullCit?.publication?.citation
    const url = fullCit?.publication?.url
    return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">[${index}]${Citation(fullCit, small)}</a>&nbsp;`
}

export const CitationsNote = (CitationCONTEXT, note) => {
    const { allCitations } = useContext(CitationCONTEXT)
    console.log(allCitations)
    console.log(note)
    const REX = /\[\s*RDBECOLI(PRC|EVC)[0-9]{5}\]/
    const PP = /(\|CITS:)|\|\./

    if (PP.exec(note)) {
        do {
            note = note.replace(PP, ' ')
        } while (PP.exec(note));
        do {
            note = note.replace(REX, relCitation(allCitations, REX.exec(note)[0]))
        } while (REX.exec(note));
    }
    return note
}