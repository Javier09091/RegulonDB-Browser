import { DataVerifier } from "../../ui-components";


/**
 * Processes operon data to extract related IDs for transcription units, genes, promoters, regulators, regulatory interactions, terminators, and their groupings.
 *
 * @export
 * @param {*} operon
 * @returns {{}}
 */
export function getRelatedIdsByOperonData(operon) {
  let ids = {};
  try {
    let tus = [];
    let genes = [];
    let promoters = [];
    let regulator = [];
    let regulatoryInteractions = [];
    let terminators = [];
    let groupByTu = {}
    let idValue = {}
    if (DataVerifier.isValidArray(operon.transcriptionUnits)) {
      operon.transcriptionUnits.forEach((transcriptionUnit) => {
        let groupTu = []
        tus = IfNoExistPush(tus, transcriptionUnit._id);
        idValue[transcriptionUnit._id] = [transcriptionUnit.name,"tu"]
        if (DataVerifier.isValidArray(transcriptionUnit.genes)) {
          transcriptionUnit?.genes.forEach((gene) => {
            genes = IfNoExistPush(genes, gene._id);
            idValue[gene._id] = [gene.name,"gene"]
            groupTu = IfNoExistPush(groupTu, gene._id);
            if (DataVerifier.isValidArray(gene.regulatorBindingSites)) {
              gene.regulatorBindingSites.forEach((rbs) => {
                if (rbs?.regulator) {
                  regulator = IfNoExistPush(regulator, rbs.regulator._id);
                  idValue[rbs.regulator._id] = [rbs.regulator.name,"regulon"]
                  groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
                }
                if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
                  rbs.regulatoryInteractions.forEach((ri) => {
                    regulatoryInteractions = IfNoExistPush(regulatoryInteractions, ri._id);
                    groupTu = IfNoExistPush(groupTu, ri._id);
                  });
                }
              });
            }
          });
        }
        if (DataVerifier.isValidObject(transcriptionUnit.promoter)) {
          promoters = IfNoExistPush(promoters, transcriptionUnit.promoter._id);
          idValue[transcriptionUnit.promoter._id] = [transcriptionUnit.promoter.name,"promoter"]
          groupTu = IfNoExistPush(groupTu, transcriptionUnit.promoter._id);
          if (DataVerifier.isValidArray(transcriptionUnit.promoter.regulatorBindingSites)) {
            transcriptionUnit.promoter.regulatorBindingSites.forEach((rbs) => {
              if (rbs?.regulator) {
                regulator = IfNoExistPush(regulator, rbs.regulator._id);
                idValue[rbs.regulator._id] = [rbs.regulator.name,"regulon"]
                groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
              }
              if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
                rbs.regulatoryInteractions.forEach((ri) => {
                  regulatoryInteractions = IfNoExistPush(regulatoryInteractions, ri._id);
                  groupTu = IfNoExistPush(groupTu, ri._id);
                });
              }
            });
          }
        }
        if (DataVerifier.isValidArray(transcriptionUnit.regulatorBindingSites)) {
          transcriptionUnit.regulatorBindingSites.forEach((rbs) => {
            if (rbs?.regulator) {
              regulator = IfNoExistPush(regulator, rbs.regulator._id);
              groupTu = IfNoExistPush(groupTu, rbs.regulator._id);
            }
            if (DataVerifier.isValidArray(rbs.regulatoryInteractions)) {
              rbs.regulatoryInteractions.forEach((ri) => {
                regulatoryInteractions = IfNoExistPush(regulatoryInteractions,ri._id);
                groupTu = IfNoExistPush(groupTu, ri._id);
              });
            }
          });
        }
        if (DataVerifier.isValidArray(transcriptionUnit.terminators)) {
          transcriptionUnit.terminators.forEach((terminator) => {
            terminators = IfNoExistPush(terminators, terminator._id);
            idValue[terminator._id] = [transcriptionUnit.name+"_terminator","terminator"]
            groupTu = IfNoExistPush(groupTu, terminator._id);
          });
        }
        groupByTu[transcriptionUnit._id] = groupTu
      });
    }
    ids = {
      transcriptionUnits: tus,
      genes: genes,
      promoters: promoters,
      regulator: regulator,
      regulatoryInteractions: regulatoryInteractions,
      terminators: terminators,
      all: genes.concat(promoters).concat(regulator).concat(regulatoryInteractions).concat(terminators),
      groupByTu:  groupByTu,
      idValue:idValue
    };
  } catch (error) {
    console.error("get Ids operon", error);
  }
  return ids;
}


/**
 * It is a utility function that checks if an element exists in an array. If the element is not found in the array, it is pushed to the array, and the updated array is returned.
 *
 * @param {{}} [array=[]]
 * @param {*} element
 * @returns {{}}
 */
function IfNoExistPush(array = [], element) {
  if (!array.find((e) => e === element)) {
    array.push(element);
    return array;
  }
  return array;
}
