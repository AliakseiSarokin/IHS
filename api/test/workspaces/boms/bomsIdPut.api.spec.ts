import {Random} from "../../../../utils/random";
import {endpoints} from "../../../testData/endpointList";
import {getDataFromWorkspaceBoms, workspaceBomsModel} from "../../../models/workspaces/boms";
import {user} from "../../../testData/global";
import {workspacesData} from "../../../testData/workspaces";
import {WorkspaceBoms} from "../../../logicLayer/workspaceBoms";
const random: Random = new Random();

describe('workspace/boms/bomId endpoint - put method - positive check', () => {

    it("add a comment to workspace bom", async () => {
        await WorkspaceBoms.addABomToWorkspaceIfNotAdded(user.groupAdmin);
        const boms = await WorkspaceBoms.getWorkspaceBomList(user.groupAdmin);
        await getDataFromWorkspaceBoms(boms);
        const randomComment: string = random.randomTextGenerator(10);
        const bomId = await WorkspaceBoms.editWorkspaceBomComment(user.groupAdmin ,endpoints.workspaces.workspacesBomsId(workspaceBomsModel.id[0]),
            workspacesData.workspacesBomsId(randomComment));
        await expect(bomId.body['WS_COMMENTS']).toEqual(randomComment)
    });

    it("delete comment from workspace bom", async () => {
        const boms = await WorkspaceBoms.getWorkspaceBomList(user.groupAdmin);
        await getDataFromWorkspaceBoms(boms);
        const randomComment: string = '';
        const bomId = await WorkspaceBoms.editWorkspaceBomComment(user.groupAdmin ,endpoints.workspaces.workspacesBomsId(workspaceBomsModel.id[0]),
            workspacesData.workspacesBomsId(randomComment));
        expect('WS_COMMENTS' in bomId).toBeFalsy()
    });
});