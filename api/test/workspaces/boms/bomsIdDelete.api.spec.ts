import {user} from "../../../testData/global";
import {requestBody} from "../../../testData/bodyList";
import {WorkspaceBoms} from "../../../logicLayer/workspaceBoms";


describe('workspaces/boms/Id endpoint - delete method', () => {

    it("delete a bom from workspace", async () => {
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin);
        const workspacesBomsList = await WorkspaceBoms.getWorkspaceBomList(user.groupAdmin);
        //delete added workspace bom
        const deletedObject = await WorkspaceBoms.deleteWorkspaceBom(user.groupAdmin,
            requestBody.workspaces.deleteBoms(workspacesBomsList[0].OBJ_ID));
        await expect(deletedObject.body).toEqual({})
    });

    it("delete an unexisting bom from workspace", async () => {
        const unexitedBomId: number = 56756756756756;
        //delete added workspace bom
        const deletedObject = await WorkspaceBoms.deleteWorkspaceBom(user.groupAdmin,
            requestBody.workspaces.deleteBoms(unexitedBomId));
        await expect(deletedObject.body).toEqual({ errorMessage: 'Could not find this BOM in your Workspace.' })
    });

});