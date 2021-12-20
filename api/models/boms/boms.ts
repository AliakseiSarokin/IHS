import {CreateModel} from "../../core/createModel";

export const bomsModel   = {
    id: null,
    type: null,
    BM_HDR_REL_INFO: null,
    BM_BOM_NAME: null,
    BM_NUM_OF_ROWS: null,
    BM_USR_ID: null,
    S_USR_NAME: null,
    BM_STATUS: null,
    BM_MFR_EXCEPT: null,
    BM_PART_EXCEPT: null,
    BM_MOD_DATE: null,
    BM_FILENAME: null,
    BM_DESC: null,
    BM_NHA: null,
    OBJ_ID: null,
    BM_TYPE: null,
    BM_CNT_ASMBLY: null,
    BM_GRP_ID: null,
};

export function getDataFromBoms (data:any) {
    CreateModel.parseListOfBomsToListOfAttributeArrays(data, bomsModel)
}