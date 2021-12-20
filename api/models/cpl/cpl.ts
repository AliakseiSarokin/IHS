import {CreateModel} from "../../core/createModel";

export const cplModel = {
    BM_CAML_COMMENTS: null,
    BM_CAML_PREFERRED: null,
    BM_CAML_STATUS: null,
    BM_CORPORATE_PN: null,
    BM_GRP_ID: null,
    BM_MFR_NAME: null,
    BM_MFR_PN: null,
    BM_REF_PART: null,
    OBJ_ID: null,
    V_CAGE_CODE: null,
    V_PRT_MFG_PTR_SPR: null,
    V_PRT_NBR_SPR: null,
    V_SHORT_MANUFACTURER_NAME: null,
    V_VMF_NAME: null,
    id: null,
    type: null,
};

export function getDataFromCpl (data:any) {
    CreateModel.parseListOfBomsToListOfAttributeArrays(data, cplModel)
}