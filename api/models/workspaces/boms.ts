import {CreateModel} from "../../core/createModel";

export interface IWorkspacesBomsResponse  {
    BM_BOM_NAME: string,
    BM_GRP_ID: number,
    BM_NHA: string,
    BM_TYPE: string,
    OBJ_ID: number,
    S_USR_NAME: string,
    S_USR_PMG_ID: string,
    WS_ITEM_ID: number,
    WS_ITEM_TYPE: string,
    WS_MODIFIED_DATE: string,
    WS_USR_ID: number,
    id: number,
    type: string
}

export const workspaceBomsModel   = {
    id: null,
    type: null,
    BM_BOM_NAME: null,
    BM_NHA: null,
    WS_MODIFIED_DATE: null,
    BM_TYPE: null,
    WS_ITEM_ID: null,
    WS_ITEM_TYPE: null,
    WS_USR_ID: null,
    OBJ_ID: null,
    S_USR_NAME: null,
    S_USR_PMG_ID: null,
    BM_GRP_ID: null
};

export function getDataFromWorkspaceBoms (data:any) {
    CreateModel.parseListOfBomsToListOfAttributeArrays(data, workspaceBomsModel)
}