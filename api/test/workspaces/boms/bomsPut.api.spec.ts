import {user} from "../../../testData/global";
import {requestBody} from "../../../testData/bodyList";
import {Boms} from "../../../logicLayer/boms";
import {WorkspaceBoms} from "../../../logicLayer/workspaceBoms";

describe('workspace boms endpoint - put method', () => {

    it("add a BOM to workspace", async () => {
        const boms = await Boms.getBomsList(user.groupAdmin);
        const addedWorkspace = await WorkspaceBoms.addBomToWorkspace(user.groupAdmin, requestBody.workspaces.boms(boms[0]['id']));
        await expect(boms[0]['BM_BOM_NAME']).toEqual(addedWorkspace.body['BM_BOM_NAME']);
        //delete added BOM from workspace
        await WorkspaceBoms.deleteWorkspaceBom(user.groupAdmin,  requestBody.workspaces.deleteBoms(addedWorkspace.body.OBJ_ID));
    });

});