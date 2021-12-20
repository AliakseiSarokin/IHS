import {user} from "../../../testData/global";
import {getDataFromWorkspaceBoms, workspaceBomsModel} from "../../../models/workspaces/boms";
import {WorkspaceBoms} from "../../../logicLayer/workspaceBoms";

describe('workspace boms endpoint - post method', () => {

    it("check BOM fields on data types", async () => {
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.userAdmin);
        const workspaceBoms = await WorkspaceBoms.getWorkspaceBomList(user.userAdmin);
        await getDataFromWorkspaceBoms(workspaceBoms);
        await expect(typeof (workspaceBomsModel.id[0])).toEqual('number');
        await expect(typeof (workspaceBomsModel.type[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.BM_BOM_NAME[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.BM_NHA[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.WS_MODIFIED_DATE[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.BM_TYPE[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.WS_USR_ID[0])).toEqual('number');
        await expect(typeof (workspaceBomsModel.OBJ_ID[0])).toEqual('number');
        await expect(typeof (workspaceBomsModel.S_USR_NAME[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.S_USR_PMG_ID[0])).toEqual('string');
        await expect(typeof (workspaceBomsModel.BM_GRP_ID[0])).toEqual('number');
    });

});